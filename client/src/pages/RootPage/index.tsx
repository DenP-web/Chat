import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loader from "../../components/ui/Loader";

import { useCheckUserQuery } from "../../app/services/authApi";
import { useSocket } from "../../hooks";

import styles from "./RootPage.module.css";

const RootPage = () => {
  const { isLoading } = useCheckUserQuery();
  useSocket();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.main}>
      <Outlet />
      <ToastContainer
        toastClassName={styles.toast}
        bodyClassName={styles.toastBody}
      />
    </main>
  );
};

export default RootPage;
