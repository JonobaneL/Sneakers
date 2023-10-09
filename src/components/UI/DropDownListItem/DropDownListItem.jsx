import React, { useState } from "react";
import styles from "./DropDownListItem.module.scss";
import { AnimatePresence, motion } from "framer-motion";
const DropDownListItem = ({ data, getData, fixed = false }) => {
  const [isOpen, setIsOpen] = useState(fixed || false);
  const subListVarianst = {
    hidden: {
      height: 0,
    },
    visible: {
      height: "fit-content",
    },
  };
  return (
    <div
      tabIndex={0}
      onBlur={() => !fixed && setIsOpen(false)}
      onClick={() => {
        if (!fixed) {
          data?.children ? setIsOpen((prev) => !prev) : getData([data]);
        }
      }}
      className={styles.listItem}
    >
      <div className={styles.mainItem}>
        <p
          onClick={(e) => {
            e.stopPropagation();
            !fixed && getData([data]);
          }}
        >
          {data?.name}
        </p>
        {data?.children ? (
          <span className={`${styles.arrow} ${isOpen ? styles.active : " "}`}>
            &#9662;
          </span>
        ) : null}
      </div>
      <AnimatePresence initial={false}>
        {data?.children && isOpen ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={subListVarianst}
            className={`${styles.subList}`}
          >
            {data?.children.map((item) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  getData([data, item]);
                }}
                key={item.id}
                className={styles.subList__item}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default DropDownListItem;
