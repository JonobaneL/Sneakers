import { useState } from "react";
import RadioButton from "../UI/radioButton/RadioButton";
import styles from "./RadioList.module.scss";
import { AnimatePresence, motion } from "framer-motion";

const RadioList = ({ list, groupName, callback = () => {}, children }) => {
  const [choosedItem, setChoosedItem] = useState();
  const buttonHandler = (e) => {
    setChoosedItem(e.target.value);
    if (choosedItem !== e.target.value) {
      callback(e.target.value);
    }
  };
  const optionVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "fit-content",
      opacity: 1,
    },
  };

  return (
    <div className={styles["radio-list"]}>
      {list.map((item, index) => (
        <div
          key={item.id}
          className={`${styles["radio-list__item"]} ${
            choosedItem === item.value ? styles.active : ""
          }`}
        >
          <label
            className={`${styles["option-head"]} ${
              item.disabled ? styles.disabled : ""
            }`}
          >
            <RadioButton
              id={item.id}
              name={groupName}
              value={item.value}
              onChange={(e) => buttonHandler(e)}
              disabled={item.disabled}
            />
            {item.label}
          </label>
          <AnimatePresence initial={false} mode="sync">
            {choosedItem === item.value && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={optionVariants}
                transition={{
                  duration: 0.3,
                }}
                className={styles["option-body"]}
              >
                {children[index]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default RadioList;
