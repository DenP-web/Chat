import React from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "../ui";

import { useUpdateMessage } from "../../hooks";

import { EditMessageFormData, Message } from "../../app/types";

import styles from "./EditMessage.module.css";

interface EditMessageProps {
  message: Message;
}

const EditMessage: React.FC<EditMessageProps> = ({ message }) => {
  const { fetchUpdateMessage, isLoading } = useUpdateMessage();
  const { control, handleSubmit } = useForm<EditMessageFormData>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      message: message.message,
    },
  });

  const onSubmit = (data: EditMessageFormData) => {
    fetchUpdateMessage({
      ...data,
      chatId: message.chatId,
      messageId: message._id,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="message"
        placeholder="Change message"
        control={control}
        label="Edit message"
      />
      <Button type="submit" text="Edit" isLoading={isLoading} />
    </form>
  );
};

export default EditMessage;
