import React from "react";
import { Control, useController } from "react-hook-form";

import styles from "./Input.module.css";
import cn from "classnames";

type InputType = "text" | "password" | "email";

interface InputProps {
  placeholder?: string;
  type?: InputType;
  name: string;
  control?: Control<any>;
  required?: string;
  label?: string;
  isPattern?: boolean;
  pattern?: RegExp;
  patternErrorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  name,
  required = "This field can't be empty",
  control,
  label,
  pattern,
  patternErrorMessage,
}) => {
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules: {
      required,
      pattern: pattern
        ? {
            value: pattern,
            message: patternErrorMessage || "Invalid format",
          }
        : undefined,
    },
  });

  return (
    <label htmlFor={name} className={styles.label}>
      {label && label}
      <input
        id={name}
        className={cn(styles.input, {[styles.password] : type === 'password'})}
        type={type}
        placeholder={placeholder}
        value={field.value || ""}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
      {invalid && <span className={styles.error}>{error?.message}</span>}
    </label>
  );
};

export default Input;
