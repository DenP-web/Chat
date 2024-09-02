import React from 'react';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmationModal}>
      <h2>Are you sure you want to delete this chat?</h2>
      <div className={styles.modalButtons}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Yes
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
