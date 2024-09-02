import React from "react";

import styles from "./ArrowButton.module.css";

interface ArrowButtonProps {
  onClickFn: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({onClickFn}) => (
  <button
    className={styles.arrowButton}
    type="button"
    aria-label="Open Sidebar"
    onClick={onClickFn}
  />
);

export default ArrowButton;
