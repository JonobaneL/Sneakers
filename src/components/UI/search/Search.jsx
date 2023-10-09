import React from "react";
import styles from "./Search.module.scss";
import searchIcon from "../../../images/header-icons/search-icon.svg";

export const Search = ({ initial, onChange }) => {
  return (
    <div className={styles.search}>
      <img src={searchIcon} alt="search" className={styles["search__icon"]} />
      <input
        type="text"
        value={initial}
        className={styles["search__field"]}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
