import { useSelector } from "react-redux";
import cn from "classnames";

import ChatList from "../ChatsList";
import ButtonRandomMessages from "../ButtonRandomMessages";
import ProfileInfo from "../ProfileInfo";
import Search from "../Search";

import { selectIsChatSelected } from "../../app/selects/chatSelects";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const isChatSelected = useSelector(selectIsChatSelected);
  return (
    <aside className={cn(styles.sidebar, { [styles.open]: !isChatSelected })}>
      <ProfileInfo />
      <Search />
      <ChatList />
      <ButtonRandomMessages />
    </aside>
  );
};

export default Sidebar;
