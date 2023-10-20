import React from "react";
import styles from "./SizeSelect.module.scss";

const SizeSelect = ({ sizes, choosed, handler, type }) => {
  const handelChange = (data) => {
    if (type == "single") {
      console.log(data);
      handler([data]);
    } else if (type == "multi") {
      if (choosed.includes(data)) {
        handler(choosed.filter((item) => item !== data));
      } else {
        handler([...choosed, data]);
      }
    }
  };
  // console.log(sizes);
  // console.log(choosed);
  return (
    <div className={styles["size-select"]}>
      {sizes.map((item, index) => (
        <div
          key={index}
          className={`${styles["size-item"]} ${
            choosed.includes(item.size) ? styles.active : ""
          } ${item.amount == 0 ? styles.disabled : ""}`}
          onClick={() => {
            if (item.amount > 0) {
              handelChange(parseFloat(item.size));
            } else {
              return;
            }
          }}
        >
          {item.size}
        </div>
      ))}
    </div>
  );
};

export default SizeSelect;
