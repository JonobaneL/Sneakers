import React from "react";
import styles from "./socialMedia.module.scss";
import facebook from "../../../images/socialMedia/facebook.png";
import instagram from "../../../images/socialMedia/instagram.png";
import pinterest from "../../../images/socialMedia/pinterest.png";

const SocialMedia = () => {
  return (
    <ul className={styles.socialMedia}>
      <li className={styles.title}>FIND US IN</li>
      <li className={styles.media__item}>
        <img src={facebook} alt="facebook" />
      </li>
      <li className={styles.media__item}>
        <img src={instagram} alt="instagram" />
      </li>
      <li className={styles.media__item}>
        <img src={pinterest} alt="pinterest" />
      </li>
    </ul>
  );
};

export default SocialMedia;
