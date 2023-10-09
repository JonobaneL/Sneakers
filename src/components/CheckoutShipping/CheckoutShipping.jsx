import React, { useState } from "react";
import styles from "./CheckoutShipping.module.scss";
import ShippingForm from "../ShippingForm/ShippingForm";
import Button from "../UI/button/Button";
import AddressesList from "../AddressesList/AddressesList";
import { useDispatch, useSelector } from "react-redux";
import { setOrderShipping } from "../../redux/checkoutSlice";

const CheckoutShipping = ({ user, validation, validationTirger }) => {
  const [addressUse, setAddressUse] = useState(false);
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkoutReducer);
  return (
    <div className={styles.shipping}>
      <div className={styles["section-title"]}>
        <h2>Shipping</h2>
        {validation.includes("shipping") && validationTirger ? (
          <span className={styles["validation-message"]}>
            Choose shipping method
          </span>
        ) : (
          ""
        )}
      </div>
      {user?.delivery_addresses?.length > 0 && !addressUse ? (
        <>
          <div>
            <AddressesList
              addresses={user.delivery_addresses}
              triger={false}
              callback={(value) => {
                dispatch(setOrderShipping(value));
              }}
            />
          </div>
          <div className={styles.another}>
            <p
              onClick={() => {
                dispatch(setOrderShipping(null));
                setAddressUse(true);
              }}
            >
              Use Another Address
            </p>
          </div>
        </>
      ) : (
        <>
          <ShippingForm
            city={user?.city || checkout.city}
            company={checkout?.shipping?.company}
          />
          {user && (
            <div className={styles["button-bar"]}>
              <Button
                mode="secondary"
                width="140px"
                height="45px"
                onClick={() => {
                  setAddressUse(false);
                  dispatch(setOrderShipping(null));
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutShipping;
