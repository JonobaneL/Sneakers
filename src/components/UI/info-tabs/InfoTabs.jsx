import React from "react";
import { useState } from "react";
import styles from "./InfoTabs.module.scss";
const InfoTabs = ({
  titles,
  children,
  initial = 0,
  disabled = [],
  getCurrentTab = () => {},
}) => {
  const [currentTab, setCurretTab] = useState(initial);
  return (
    <div className={styles["info-tabs"]}>
      <div className={styles["tabs-nav"]}>
        {titles.map((item, index) => {
          const validItem = !disabled.includes(index);
          return (
            <div
              key={index}
              className={`${styles["nav-item"]} ${
                index == currentTab ? styles.active : ""
              } ${!validItem ? styles.disabled : ""}`}
              onClick={() => {
                if (validItem) {
                  setCurretTab(index);
                  getCurrentTab(index);
                }
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className={styles["tabs-content"]}>
        {children.map((item, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              index == currentTab ? styles.active : ""
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoTabs;
