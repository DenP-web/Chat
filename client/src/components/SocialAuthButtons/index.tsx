import { toast } from "react-toastify";
import { GOOGLE_LOGIN_URL } from "../../constants";

import styles from "./SocialAuthButtons.module.css";

export default function SocialAuthButtons() {
  const handleGoogleLogin = () => {
    window.location.href = GOOGLE_LOGIN_URL;
  };

  const handleFacebookLogin = () => {
    toast.error(
      "Facebook login is currently unavailable. Please try again later."
    );
  };

  const handleLinkedInLogin = () => {
    toast.error(
      "LinkedIn login is currently unavailable. Please try again later."
    );
  };
  
  return (
    <div className={styles.wrapper}>
      <span className={styles.description}>
        Use one of your account to connect
      </span>
      <ul className={styles.socialWrapper}>
        <li>
          <button
            onClick={handleGoogleLogin}
            className={`${styles.btn} ${styles.google}`}
            aria-label="Sign in with Google"
          />
        </li>
        <li>
          <button
            onClick={handleFacebookLogin}
            className={`${styles.btn} ${styles.facebook}`}
            aria-label="Sign in with Facebook"
          />
        </li>
        <li>
          <button
            onClick={handleLinkedInLogin}
            className={`${styles.btn} ${styles.linkedIn}`}
            aria-label="Sign in with Custom Service"
          />
        </li>
      </ul>
    </div>
  );
}
