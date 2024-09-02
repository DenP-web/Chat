import { useState } from "react";
import RegistrationForm from "../../components/RegistrationForm";
import LoginForm from "../../components/LoginForm";
import SocialAuthButtons from "../../components/SocialAuthButtons";

import styles from "./AuthPage.module.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>{isLogin ? "Login" : "Registration"}</h3>
      <SocialAuthButtons />
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <button type="button" onClick={toggleForm} className={styles.btn}>
        {isLogin ? "Join us! Sign up" : "Already a member? Sign in"}
      </button>
    </section>
  );
};

export default AuthPage;
