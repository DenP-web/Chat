import React from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import EditMessage from "../EditMessage";
import Avatar from "../ui/Avatar";

import { selectUser } from "../../app/selects/userSelects";
import { useModal } from "../../context/ModalContext";
import { Message } from "../../app/types";

import styles from "./MessageCard.module.css";

interface MessageCardProps {
  message: Message;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const { showModal } = useModal();
  const user = useSelector(selectUser);

  const isYourMessage = message.sender?._id === user?._id
  
  const openEditModal = () => {
    showModal(<EditMessage message={message} />);
  };

  return (
    <>
      <div className={cn(styles.card, { [styles.fromMe]: isYourMessage })}>
        <Avatar imgUrl={message.sender.profilePic} />
        <div className={styles.message}>
          <p>{message.message}</p>
          <button
            className={styles.edit}
            type="button"
            onClick={openEditModal}
            aria-label="Edit message"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageCard;
