import React from "react";

import { API_URL } from "../../../constants";

import styles from "./Avatar.module.css";

interface AvatarProps {
  imgUrl?: string;
}

const Avatar: React.FC<AvatarProps> = ({ imgUrl = '' }) => {
  const avatarUrl = imgUrl.includes('https') ? imgUrl : API_URL+imgUrl

  return (
    <div className={styles.avatar}>
      <img src={avatarUrl} alt="Avatar" />
    </div>
  );
};

export default Avatar;
