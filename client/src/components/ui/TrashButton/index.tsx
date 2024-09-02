import React from "react";
import styles from "./TrashButton.module.css";

interface TrashButtonProps {
  clickFn: () => void;
}

const TrashButton: React.FC<TrashButtonProps> = ({ clickFn }) => (
  <button onClick={clickFn} className={styles.trashButton} type="button" aria-label="Delete Chat" />
);

export default TrashButton;
