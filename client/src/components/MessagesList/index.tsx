import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import MessageCard from "../MessageCard";
import { Loader } from "../ui";
import { selectChat } from "../../app/selects/chatSelects";
import { useGetMessagesQuery } from "../../app/services/messageApi";
import styles from "./MessagesList.module.css";

const MessagesList = () => {
  const chat = useSelector(selectChat);
  const { data } = useGetMessagesQuery(chat?._id);
  const lastMessageRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (!chat) return null;
  if (!data) return <Loader />;

  return (
    <ul className={styles.messages}>
      {data.messages.map((msg, index) => (
        <li
          key={msg._id}
          ref={index === data.messages.length - 1 ? lastMessageRef : null}
        >
          <MessageCard message={msg} />
        </li>
      ))}
    </ul>
  );
};

export default MessagesList;
