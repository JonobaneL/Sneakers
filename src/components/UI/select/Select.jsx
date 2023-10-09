import React, { useState } from "react";
import styles from "./Select.module.scss";
import arrow from "../../../images/down-arrow.svg";
const Select = ({
  placeholder,
  params,
  getData,
  type = "underLineType",
  height = "40px",
  disabled = [],
  optionsHeight = "180px",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState({});

  const selectOption = (option) => {
    setSelectValue(option);
    getData(option);
    setIsOpen(false);
  };
  const isOptionSelected = (option) => {
    return option.id === selectValue.id;
  };
  const handler = () => {
    setIsOpen((p) => !p);
  };
  return (
    <div tabIndex={0} className={styles.select} onBlur={() => setIsOpen(false)}>
      <div
        className={`${styles.selectField} ${styles[type]}`}
        style={{ height: height }}
        onClick={handler}
      >
        <p>
          {selectValue.value || (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </p>
        <button className={`${styles.arrow} ${isOpen ? styles.active : ""}`}>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <div
        style={{ maxHeight: optionsHeight }}
        className={`${styles.options} ${isOpen ? styles.active : ""}`}
      >
        <ul>
          {params.map((item) => (
            <li
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled.includes(item.id)) selectOption(item);
              }}
              className={`${styles.options__item} ${
                isOptionSelected(item) ? styles.active : ""
              } ${disabled.includes(item.id) ? styles.disabled : ""}`}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
