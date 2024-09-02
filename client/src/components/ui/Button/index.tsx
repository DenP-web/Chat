import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

type ButtonType = "button" | "submit";
type ButtonSize = "sm" | "lg";

interface ButtonProps {
  onClickFn?: () => void;
  type?: ButtonType;
  text: string;
  size?: ButtonSize
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({ onClickFn, type, text, size = 'lg' }) => {
  return (
    <button onClick={onClickFn} type={type} className={cn(styles.button, styles[size])}>
      {text}
    </button>
  );
};

export default Button;
