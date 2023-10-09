import React, { useState } from "react";
import styles from "./CheckoutPayment.module.scss";
import RadioList from "../RadioList/RadioList";
import CreditCardFrom from "../CreditCardForm/CreditCardFrom";
import Button from "../UI/button/Button";
import MethodsList from "../MedhodsList/MethodsList";
import PayPalIcon from "../../images/PayPal-icon.svg";
import { useDispatch } from "react-redux";
import { setCardInfo, setOrderPaymentMethod } from "../../redux/checkoutSlice";

const CheckoutPayment = ({ user, validation, validationTirger }) => {
  const [cardUse, setCardUse] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className={styles.payment}>
      <div className={styles["section-title"]}>
        <h2>Payment</h2>
        {validation.includes("payment") && validationTirger ? (
          <span className={styles["validation-message"]}>
            Choose payment method
          </span>
        ) : (
          ""
        )}
        {validation.includes("card") && validationTirger ? (
          <span className={styles["validation-message"]}>
            Enter your card details
          </span>
        ) : (
          ""
        )}
      </div>
      <RadioList
        list={[
          {
            id: "upon-receipt",
            label: "Payment upon receipt of goods",
            value: "Payment upon receipt of goods",
          },
          {
            id: "by-card",
            label: "Credit or Debit Card",
            value: "Credit or Debit Card",
          },
          {
            id: "paypal",
            label: (
              <img src={PayPalIcon} alt="PayPal" style={{ width: "100px" }} />
            ),
            value: "PayPal",
          },
        ]}
        groupName="payment"
        callback={(value) => {
          dispatch(setOrderPaymentMethod(value));
          dispatch(setCardInfo(null));
        }}
      >
        <></>
        <div className={styles["payment-option"]}>
          {user?.payment_methods?.length > 0 && !cardUse ? (
            <>
              <div className={styles.list}>
                <MethodsList
                  methods={user.payment_methods}
                  triger={false}
                  callback={(value) => dispatch(setCardInfo(value))}
                />
              </div>
              <div className={styles.another}>
                <p
                  onClick={() => {
                    setCardUse((p) => !p);
                    dispatch(setCardInfo(null));
                  }}
                >
                  Use Another Card
                </p>
              </div>
            </>
          ) : (
            <>
              <div
                className={`${styles["card-form"]} ${
                  cardUse ? styles.active : ""
                }`}
              >
                <CreditCardFrom />
              </div>
              {user && (
                <div className={styles["button-bar"]}>
                  <Button
                    mode="secondary"
                    width="140px"
                    height="45px"
                    onClick={() => setCardUse(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <></>
      </RadioList>
    </div>
  );
};

export default CheckoutPayment;
