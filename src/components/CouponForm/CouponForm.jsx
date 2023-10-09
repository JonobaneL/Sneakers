import React, { useRef, useState } from "react";
import CInput from "../UI/input/CInput";
import Button from "../UI/button/Button";
import Toast from "../ToastV2/Toast";
import { useDispatch, useSelector } from "react-redux";
import { getCoupon } from "../../firebase/cartFirebaseAPI";
import styles from "./CouponForm.module.scss";
import { setDiscount } from "../../redux/cartSlice";

const CouponForm = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const [CartToast, setCartToast] = useState({
    type: "",
    content: "",
  });
  const [isToastOpen, setToastOpen] = useState(false);
  const couponRef = useRef(null);

  const removeCoupon = () => {
    dispatch(setDiscount(0));
    setCartToast({ type: "warning", content: "Coupon was deleted" });
    setToastOpen(true);
  };
  const couponHandler = async () => {
    let discount_res = null;
    try {
      const response = await getCoupon(couponRef.current.value);
      response.forEach((item) => (discount_res = item.data()));
    } catch (err) {
      console.log(err);
    }
    if (couponRef.current?.value == "") {
      setCartToast({ type: "warning", content: "Enter coupon" });
      setToastOpen(true);
      return;
    }

    if (discount_res == null) {
      setCartToast({ type: "error", content: "Coupon not found" });
      couponRef.current.value = "";
    } else {
      dispatch(setDiscount(discount_res.value));
      setCartToast({ type: "success", content: "Coupon was added" });
      couponRef.current.value = "";
    }
    setToastOpen(true);
  };

  return (
    <div className={styles["coupon-form"]}>
      <h4 className={styles["coupon-title"]}>Have a coupon?</h4>
      <div className={styles.coupon}>
        <CInput id="coupon" placeholder="Coupon code" ref={couponRef} />
        <div className={styles["apply-coupon"]}>
          <Button
            mode="primary"
            height="40px"
            width="75px"
            onClick={couponHandler}
          >
            Apply
          </Button>
        </div>
      </div>
      {cart.cartDiscount ? (
        <p onClick={removeCoupon} className={styles["coupon-remove"]}>
          Remove coupon
        </p>
      ) : null}
      <Toast
        type={CartToast.type}
        title={CartToast.content}
        triger={isToastOpen}
        closeHandler={setToastOpen}
      />
    </div>
  );
};

export default CouponForm;
