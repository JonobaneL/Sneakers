import React, { useRef } from "react";
import styles from "./PaymentMethods.module.scss";
import CInput from "../UI/input/CInput";
import Button from "../UI/button/Button";
import { useInput } from "../../hooks/useInput";
import ValidationErrorMessages from "../ValidationErrorMessages/ValidationErrorMessages";
import { addPaymentMethod } from "../../firebase/userFirebaseAPI";
import {
  normilizeDate,
  normilzeCardNumber,
} from "../../utils/normalizeMethods";

const PaymentMethods = ({ userID, closeHandler, triger }) => {
  const cardNumber = useInput(
    "",
    { isEmpty: true, minLength: 16 },
    {
      isEmpty: "Please enter card number",
      minLength: "Please enter the card number in full",
    }
  );
  const date = useInput(
    "",
    { isEmpty: true, minLength: 5 },
    { isEmpty: "Please enter date", minLength: "Please enter the date in full" }
  );
  const cvvNumber = useInput(
    "",
    { isEmpty: true, minLength: 3 },
    {
      isEmpty: "Please enter cvv code",
      minLength: "Please enter the cvv code in full",
    }
  );
  const saveHandler = async () => {
    try {
      await addPaymentMethod({
        uid: userID,
        method: {
          methodID: `method${Date.now()}`,
          cardNumber: cardNumber.value,
          date: date.value,
          cvv: cvvNumber.value,
        },
      });
      closeHandler();
      triger();
    } catch (err) {
      console.log(err.message);
    }
  };

  const isFormValid = (params) => {
    return params.includes(false) ? true : false;
  };
  return (
    <div className={styles["payment-methods"]}>
      <ValidationErrorMessages
        durty={cardNumber.isDurty}
        errorMessages={cardNumber.currentErrors}
      >
        <CInput
          mode="fullBorder"
          height="50"
          placeholder="Cart Number"
          maxLength="20"
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9]/gi, "");
            e.target.value = normilzeCardNumber(value, cardNumber.setValue);
          }}
          onBlur={(e) => cardNumber.onBlur(e)}
          valid={cardNumber.isDurty && cardNumber.currentErrors.length > 0}
        />
      </ValidationErrorMessages>
      <ValidationErrorMessages
        durty={date.isDurty}
        errorMessages={date.currentErrors}
      >
        <CInput
          mode="fullBorder"
          height="50"
          placeholder="MM/YY"
          maxLength="5"
          onChange={(e) => {
            const { value } = e.target;
            e.target.value = normilizeDate(value, date.setValue);
          }}
          onBlur={(e) => date.onBlur(e)}
          valid={date.isDurty && date.currentErrors.length > 0}
        />
      </ValidationErrorMessages>

      <ValidationErrorMessages
        durty={cvvNumber.isDurty}
        errorMessages={cvvNumber.currentErrors}
      >
        <CInput
          mode="fullBorder"
          height="50"
          placeholder="CVV"
          maxLength="3"
          value={cvvNumber.value}
          onChange={(e) => cvvNumber.onChange(e)}
          onBlur={(e) => cvvNumber.onBlur(e)}
          valid={cvvNumber.isDurty && cvvNumber.currentErrors.length > 0}
        />
      </ValidationErrorMessages>

      <div className={styles["button-bar"]}>
        <Button
          mode="primary"
          width="140px"
          height="45px"
          onClick={saveHandler}
          disabled={isFormValid([
            cardNumber.isValid,
            date.isValid,
            cvvNumber.isValid,
          ])}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethods;
