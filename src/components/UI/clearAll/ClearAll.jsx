import React from "react";
import styles from "./ClearAll.module.scss";
import { createSearchParams, useLocation } from "react-router-dom";

const ClearAll = ({ onClear }) => {
  const location = useLocation();
  const triger = createSearchParams(location)?.get("search");
  if (!triger.toString()) return;

  return (
    <button className={styles.clear} onClick={onClear}>
      Clear All Refinements
    </button>
  );
};
export default ClearAll;
