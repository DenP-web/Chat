import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import MessagesList from "../MessagesList";
import SendMessageForm from "../SendMessageForm";
import NoChatSelected from "../NoChatSelected";
import ChatHeader from "../ChatHeader";

import { selectIsChatSelected } from "../../app/selects/chatSelects";

import styles from "./ChatContent.module.css";

const ChatContent = () => {
  const isChatSelected = useSelector(selectIsChatSelected);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.chatContent}>
      {isMobile ? (
        <>
          <ChatHeader />
          <MessagesList />
          <SendMessageForm />
        </>
      ) : isChatSelected ? (
        <>
          <ChatHeader />
          <MessagesList />
          <SendMessageForm />
        </>
      ) : (
        <NoChatSelected />
      )}
    </section>
  );
};

export default ChatContent;
