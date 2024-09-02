import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Button, Input } from "../ui";

import { selectUser } from "../../app/selects/userSelects";

import { UpdateUserFormData } from "../../app/types";

import styles from "./UpdateChatForm.module.css";
import useUpdateUser from "../../hooks/useUpdateUser";

const UpdateUserForm = () => {
  const currentUser = useSelector(selectUser);
  const { fetchUpdate, isLoading } = useUpdateUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const { control, handleSubmit, reset } = useForm<UpdateUserFormData>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      fullName: currentUser?.fullName,
    },
  });

  const onSubmit = (data: UpdateUserFormData) => {
    fetchUpdate(avatarFile ? { ...data, avatar: avatarFile } : data, () => reset());
  };

  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setAvatarFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        type="text"
        placeholder="Type a message..."
        name="fullName"
        control={control}
      />
      <input
        type="file"
        name="avatar"
        onChange={fileHandler}
        accept=".jpg,.jpeg,.png,.webp"
      />
      <Button type="submit" text="Update" isLoading={isLoading} />
    </form>
  );
};

export default UpdateUserForm;
