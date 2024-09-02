import ChatCard from "../ChatCard";
import { useGetChatsQuery } from "../../app/services/chatApi";
import { Loader } from "../ui";
import styles from "./ChatsList.module.css";

const ChatList = () => {
  const { data, isLoading } = useGetChatsQuery();
  if (isLoading) return <Loader />;
  return (
    <ul className={styles.chatList}>
      {data?.chats.map((chat) => (
        <li key={chat._id}>
          <ChatCard chat={chat} />
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
