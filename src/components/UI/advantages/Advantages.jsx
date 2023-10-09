import React from "react";
import styles from "./Advantages.module.scss";
import delivery from "../../../images/advantages-icons/return.png";
import quality from "../../../images/advantages-icons/quality-assurance.png";
import giftCard from "../../../images/advantages-icons/gift-card.png";
import payment from "../../../images/advantages-icons/mobile-payment1.png";

const Advantages = () => {
  return (
    <div className={styles.advantages}>
      <div className={styles.content}>
        <div className={styles.advantage}>
          <img src={delivery} alt="Fast Delivery" />
          <div className={styles.info}>
            <h3 className={styles.title}>Return And Exchange</h3>
            <p className={styles.description}>
              Don't worry if you get wrong size or color
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <img src={payment} alt="Payment" />
          <div className={styles.info}>
            <h3 className={styles.title}>Pay Your Way</h3>
            <p className={styles.description}>
              Purchase in parts from monobank, PrivatBank, Credit Card and more.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <img src={giftCard} alt="Gift Card" />
          <div className={styles.info}>
            <h3 className={styles.title}>Sneakers Gift Card</h3>
            <p className={styles.description}>
              Fits every time! Physical card or instant eGift Card.
            </p>
          </div>
        </div>
        <div className={styles.advantage}>
          <img src={quality} alt="Quality Assurance" />
          <div className={styles.info}>
            <h3 className={styles.title}>Quality Assurance</h3>
            <p className={styles.description}>We sale only original shoes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
