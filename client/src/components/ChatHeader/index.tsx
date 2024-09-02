import { useDispatch, useSelector } from "react-redux";

import { ArrowButton } from "../ui";

import { leave } from "../../app/slices/chatSlice";

import { selectChat } from "../../app/selects/chatSelects";
import { selectUser } from "../../app/selects/userSelects";

import styles from "./ChatHeader.module.css";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const user = useSelector(selectUser);

  const leaveChat = () => {
    dispatch(leave());
  };

  if (!user) return null;

  return (
    <header className={styles.header}>
      <ArrowButton onClickFn={leaveChat} />
      <h1>
        {chat?.participants[0].fullName} / {chat?.participants[1]?.fullName}{" "}
      </h1>
    </header>
  );
};

export default ChatHeader;
