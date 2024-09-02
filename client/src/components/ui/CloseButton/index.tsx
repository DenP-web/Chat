import React from "react";
import styles from "./CloseButton.module.css";
import cn from "classnames";

type PositionType = "right-top" | "right";

interface CloseButtonProps {
  onClick: () => void;
  size?: number;
  color?: string;
  position?: PositionType;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  size = 24,
  color = "#000",
  position = "right-top",
}) => {
  return (
    <button
      className={cn(styles.closeButton, styles[position])}
      onClick={onClick}
      style={{ width: size, height: size, color }}
      aria-label="Close"
      type="button"
    >
      &times;
    </button>
  );
};

export default CloseButton;
