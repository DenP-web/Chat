import React from "react";
import styles from "./Input.module.css";
import { UseFormRegister } from "react-hook-form";

interface SearchInputProps {
  name: string;
  register: UseFormRegister<any>;
}

const SearchInput: React.FC<SearchInputProps> = ({ name, register }) => {
  return (
    <label htmlFor={name} className={styles.label}>
      <input
        id={name}
        className={styles.input}
        type="text"
        placeholder="Search..."
        {...register(name)}
      />
    </label>
  );
};

export default SearchInput;
