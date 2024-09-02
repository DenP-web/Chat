import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { Button, Input } from "../ui";

import { useSendMessage } from "../../hooks";
import { selectChat } from "../../app/selects/chatSelects";

import styles from "./SendMessageForm.module.css";

interface MessageFormData {
  message: string;
}

const SendMessageForm = () => {
  const chat = useSelector(selectChat);
  const { fetchSendMessage, isLoading } = useSendMessage();

  const { control, handleSubmit, resetField } = useForm<MessageFormData>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (data: MessageFormData) => {
    if (chat) {
      fetchSendMessage(
        {
          chatId: chat._id,
          message: data.message,
        },
        () => {
          resetField("message");
        }
      );
    }
  };

  return (
    <form className={styles.inputWrapper} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Type a message..."
        name="message"
        control={control}
      />
      <Button type="submit" text="Send" isLoading={isLoading} />
    </form>
  );
};

export default SendMessageForm;
