import Avatar from "../ui/Avatar";

import { useCreateChat } from "../../hooks";

import { User } from "../../app/types";

import styles from "./SearchCard.module.css";

interface SearchCardProps {
  user: User;
  closePopup: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ user, closePopup }) => {
  const { fetchCreateChat } = useCreateChat();

  const createChat = () => {
    fetchCreateChat(user._id);
    closePopup();
  };

  return (
    <article className={styles.searchCard} onClick={createChat}>
      <Avatar imgUrl={user.profilePic} />
      <p className={styles.fullName}>{user.fullName}</p>
    </article>
  );
};

export default SearchCard;
