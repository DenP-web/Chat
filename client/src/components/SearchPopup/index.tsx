import React from "react";
import cn from "classnames";

import SearchCard from "../SearchCard";
import Loader from "../ui/Loader";

import { useGetAllUsersQuery } from "../../app/services/userApi";

import styles from "./SearchPopup.module.css";

interface SearchPopupProps {
  searchValue: string;
  closePopup: () => void
}

const SearchPopup: React.FC<SearchPopupProps> = ({ searchValue = "", closePopup }) => {
  const isOpen = searchValue.length > 0;

  const { data, isLoading } = useGetAllUsersQuery(searchValue);

  if (isLoading) return <Loader />;

  return (
    <div className={cn(styles.popup, { [styles.open]: isOpen })}>
      <h3 className={styles.title}>
        {data && data.users.length > 0 ? "Founded users" : "No users found"}
      </h3>
      <ul className={styles.list}>
        {data?.users.map((user) => (
          <li key={user._id}>
            <SearchCard user={user} closePopup={closePopup} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPopup;
