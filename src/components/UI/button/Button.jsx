import React from "react";
import styles from "./Button.module.scss";
const Button = ({
  mode,
  width = "100px",
  height = "40px",
  children,
  ...params
}) => {
  return (
    <button
      className={styles[mode]}
      style={{ width: width, height: height }}
      {...params}
    >
      {children}
    </button>
  );
};

export default Button;
