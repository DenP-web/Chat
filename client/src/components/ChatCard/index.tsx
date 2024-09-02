import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, TrashButton } from "../ui";
import ConfirmationModal from "../ConfirmationModal";

import { selectUser } from "../../app/selects/userSelects";
import { useModal } from "../../context/ModalContext";
import { join, leave } from "../../app/slices/chatSlice";
import { useDeleteChat } from "../../hooks";

import { Chat, User } from "../../app/types";

import styles from "./ChatCard.module.css";

interface ChatCardProps {
  chat: Chat;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { showModal, closeModal } = useModal();
  const { fetchDeleteChat } = useDeleteChat();

  const deleteChat = () => {
    fetchDeleteChat(chat._id);
    closeModal();
    dispatch(leave())
  };

  const handleTrashClick = () => {
    showModal(
      <ConfirmationModal onCancel={closeModal} onConfirm={deleteChat} />
    );
  };

  const selectChat = () => {
    dispatch(join(chat));
  };

  const receiverParticipant: User | undefined = chat.participants.find(
    (p) => p._id !== user?._id
  );

  return (
    <article className={styles.chatCard} onClick={selectChat}>
      {!receiverParticipant ? (
        "You are alone in this chat"
      ) : (
        <>
          <Avatar imgUrl={receiverParticipant.profilePic} />
          <p className={styles.fullName}>{receiverParticipant.fullName}</p>
        </>
      )}
      <TrashButton clickFn={handleTrashClick} />
    </article>
  );
};

export default ChatCard;
