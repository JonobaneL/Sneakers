import React from "react";
import styles from "./AccordionButton.module.scss";

const AccordionButton = ({ triger = null, handler }) => {
  return (
    <div
      onClick={(e) => {
        handler();
        e.stopPropagation();
      }}
      className={`${styles.btn} ${triger ? styles.opened : ""}`}
    />
  );
};
export default AccordionButton;
