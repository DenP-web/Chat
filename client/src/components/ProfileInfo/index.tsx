import { useSelector } from "react-redux";

import { Button, Avatar } from "../ui";

import { useModal } from "../../context/ModalContext";
import { useLogout } from "../../hooks";
import { selectUser } from "../../app/selects/userSelects";

import styles from "./ProfileInfo.module.css";
import UpdateUserForm from "../UpdateUserForm";

const ProfileInfo = () => {
  const user = useSelector(selectUser);
  const { showModal } = useModal();
  const { fetchLogout, isLoading } = useLogout();

  const logOutHandler = () => {
    fetchLogout();
  };

  const handlerShowModal = () => {
    showModal(<UpdateUserForm />);
  };

  return (
    <div className={styles.profile}>
      <Avatar imgUrl={user?.profilePic} />
      <div className={styles.username}>
        <p>{user?.fullName}</p>
      </div>
      <div className={styles.buttons}>
        <Button
          onClickFn={logOutHandler}
          text="Logout"
          size="sm"
          isLoading={isLoading}
        />
        <Button
          onClickFn={handlerShowModal}
          text="Update"
          size="sm"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
