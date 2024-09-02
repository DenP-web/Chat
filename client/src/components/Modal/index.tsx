import React from "react";
import { useModal } from "../../context/ModalContext";
import styles from "./Modal.module.css";
import cn from "classnames";
import CloseButton from "../ui/CloseButton";

const Modal: React.FC = () => {
  const { content, closeModal, isOpen } = useModal();

  return (
    <div
      className={cn(styles.modalOverlay, { [styles.open]: isOpen })}
      onClick={closeModal}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {content}
        <CloseButton onClick={closeModal} />
      </div>
    </div>
  );
};

export default Modal;
