import { useSelector } from "react-redux";
export const checkCheckout = (userInfo) => {
  const checkout = useSelector((state) => state.checkoutReducer);
  const userCheck = userInfo.includes(false);
  const shippingKeys = Object.keys(checkout.shipping);
  const shippingOptions = ["address", "appartment"];
  const shippingCheck =
    shippingOptions.every((item) => shippingKeys.includes(item)) ||
    shippingKeys.includes("postOffice");
  const paymentCheck = checkout.paymentMethod.length > 0;
  const cardCheck =
    checkout?.card?.cardNumber.length === 19 &&
    checkout?.card?.date?.length === 5 &&
    checkout?.card?.cvv?.length === 3;
  let validationMessages = [];
  if (userCheck) {
    validationMessages.push("user");
  }
  if (!shippingCheck) {
    validationMessages.push("shipping");
  }
  if (!paymentCheck) {
    validationMessages.push("payment");
  }
  if (
    checkout?.paymentMethod === "Credit or Debit Card" &&
    cardCheck === false
  ) {
    validationMessages.push("card");
  }
  if (validationMessages.length > 0) {
    return [...validationMessages, true];
  } else return [false];
};
