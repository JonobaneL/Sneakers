import React from "react";
import styles from "./CommonInfo.module.scss";
import InfoTabs from "../UI/info-tabs/InfoTabs";

const CommonInfo = () => {
  return (
    <>
      <InfoTabs titles={["Delivery", "Payment", "Guarantee"]}>
        <div className={styles.tab}>
          <div className={styles["title"]}>Fast delivery 1-3 days</div>
          <p className={styles["sub-title"]}>
            Delivery of orders placed before 15:00 takes 1-3 days (delivery time
            depends on your location).Shipping orders every day!
          </p>
          <div className={styles["title"]}>Free delivery by Novaya Poshta</div>
          <p className={styles["sub-title"]}>
            When ordering from 150$ and full payment by card, product delivery
            is free.
          </p>
          <div className={styles["title"]}>Courier delivery</div>
          <p className={styles["sub-title"]}>
            Courier delivery in your city is possible for a partial prepayment.
          </p>
        </div>
        <div className={styles.tab}>
          <ul className={styles.payments}>
            <li>
              Cash on delivery / cash on delivery (possible with a minimum
              prepayment of $10).
              <br />
              In the case of 2 or more products in the order - payment of $10
              for each product unit.
            </li>
            <li>
              Bank card Visa / Mastercard, Privat24, LiqPay, Monobank, etc.
            </li>
          </ul>
        </div>
        <div className={styles.tab}>
          <p className={styles.guarantee}>
            According to - Law of Ukraine "
            <a
              target="_blank"
              href="https://zakon.rada.gov.ua/laws/show/1023-12#Text"
            >
              On the Protection of Consumer Rights
            </a>
            ", exchange and return is possible within 14 calendar days from the
            moment of receipt of the goods. In the case of exchange and return -
            Customer pays for postal services, except in cases of product
            shortage and/or our error during shipment. In such cases, the costs
            are covered by the online store.
          </p>
        </div>
      </InfoTabs>
    </>
  );
};

export default CommonInfo;
