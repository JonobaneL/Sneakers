import React from "react";
import ReactDom from "react-dom";
import styles from "./SearchResults.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { searchEngine } from "../../utils/searchEngine";
import {
  resultsVariants,
  wrapperVariants,
} from "../../variants/searchResultsVariants";
import SearchCard from "../SearchCard/SearchCard";
import SearchedCategories from "../SearchedCategories/SearchedCategories";

const SearchResults = ({ isOpen, onChange, query, onChangeQuery }) => {
  if (isOpen) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
  const [productsResult, categoriesResult] = searchEngine(query);
  const wrapperHandler = () => {
    onChangeQuery("");
    onChange(false);
  };

  return ReactDom.createPortal(
    <AnimatePresence initial={false}>
      {isOpen && query.length > 0 && (
        <motion.div
          initial="exit"
          animate="enter"
          exit="exit"
          variants={wrapperVariants}
          transition={{
            delay: 0.5,
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          }}
          className={styles.wrapper}
          onClick={wrapperHandler}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={resultsVariants}
            className={styles["search-results"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.content}>
              {productsResult.length > 0 ? (
                <div className={styles.products}>
                  {productsResult.map((item, index) => {
                    if (index <= 4) {
                      return (
                        <SearchCard
                          key={index}
                          product={item}
                          onChange={onChange}
                          onChangeQuery={onChangeQuery}
                        />
                      );
                    }
                  })}
                </div>
              ) : categoriesResult.length === 0 ? (
                <div className={styles["warning-message"]}>
                  <span>No Results</span>
                  <p>Try another words</p>
                </div>
              ) : null}
              <SearchedCategories
                categories={categoriesResult}
                onChange={onChange}
                onChangeQuery={onChangeQuery}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("searchResults")
  );
};

export default SearchResults;
