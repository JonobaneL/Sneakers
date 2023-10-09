import React from "react";
import styles from "./SearchedCategories.module.scss";
import { useNavigate } from "react-router-dom";

const SearchedCategories = ({ categories, onChange, onChangeQuery }) => {
  if (categories.length === 0) return;

  const navigate = useNavigate();
  return (
    <div className={styles.categories}>
      <div className={styles.title}>Search by category</div>
      <div className={styles["category-list"]}>
        {categories.map((item, index) => {
          if (item.parent === null) {
            return (
              <div
                onClick={() => {
                  navigate({
                    pathname: "/all/all",
                    search: `category=${item.name}`,
                  });
                  onChange(false);
                  onChangeQuery("");
                }}
                className={styles.list__item}
                data-index={index}
                key={item.id}
              >
                {item.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchedCategories;
