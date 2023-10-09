import React from "react";
import CInput from "../UI/input/CInput";
import styles from "./Subscribe.module.scss";
import Button from "../UI/button/Button";
const Subscribe = () => {
  return (
    <div className={styles.subscribe}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>Find Your Next Pair of Shoes at Sneakers</h2>
          <p className={styles["sub-title"]}>
            Subscribe and be the first who receive information about discounts
            and new products
          </p>
        </div>
        <div className={styles.emailForm}>
          <CInput id="location-underline-40" height={40} placeholder="E-mail" />
          <div className={styles.singUpButton}>
            <Button mode="primary" width="100%" height="100%">
              SING UP
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
