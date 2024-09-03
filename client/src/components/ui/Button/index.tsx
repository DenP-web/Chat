import React from "react";
import cn from "classnames";
import { Spinner } from "../";

import styles from "./Button.module.css";

type ButtonType = "button" | "submit";
type ButtonSize = "sm" | "lg";

interface ButtonProps {
  onClickFn?: () => void;
  type?: ButtonType;
  text: string;
  size?: ButtonSize;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClickFn,
  type = "button",
  text,
  size = "lg",
  isLoading,
}) => {
  return (
    <button
      onClick={onClickFn}
      type={type}
      className={cn(styles.button, styles[size], {
        [styles.loading]: isLoading,
      })}
    >
      {isLoading ? <Spinner /> : text}
    </button>
  );
};

export default Button;
