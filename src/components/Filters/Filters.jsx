import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import Select from "../UI/select/Select";
import Accordion from "../UI/accordion/Accordion";
import Button from "../UI/button/Button";
import CheckBoxList from "../UI/checkBoxList/CheckBoxList";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import DropDownList from "../UI/dropDownList/dropDownList";
import SizeSelect from "../UI/sizeSelect/SizeSelect";
import filtersIcon from "../../images/filters.png";
import { useSearch } from "../../hooks/useSearch";
import ClearButton from "../UI/clear-button/ClearButton";
import { AnimatePresence, motion } from "framer-motion";
import closeIcon from "../../images/cancel.svg";
import { Search } from "../UI/search/Search";
import { productsFilterParrams } from "../../utils/productsFilters";
import { updateObject } from "../../utils/objectSort";
import ClearAll from "../UI/clearAll/ClearAll";

const filtersWrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};
const filtersOptionsVariants = {
  hidden: {
    y: 1000,
  },
  visible: {
    y: 0,
  },
};

const FILTERS_SERIALIZE = (data) => data.join("-");
const FILTERS_DESERIALIZE = (data) => (data ? data.split("-") : []);
const FILTERS_SIZE_DESERIALIZE = (data) =>
  data ? data.split("-").map((item) => parseFloat(item)) : [];

const Filters = ({
  loading,
  productsLength,
  onChangeProductFilter,
  onChangeModelFilter,
}) => {
  const [sort, setSort] = useState();
  const windowSize = window.screen.availWidth <= 1024;

  const { type, male } = useParams();
  const {
    categories,
    brands,
    materials,
    sizeList,
    colors,
    sort_params,
    price_params,
    percent_params,
  } = productsFilterParrams(type, male);
  const [categoryFilters, setCategoryFilters] = useSearchParamsState({
    name: "category",
    serialize: (data) => data.join(">"),
    deserialize: (data) => (data ? data.split(">") : []),
  });
  const [brandFilters, setBrandFilters] = useSearchParamsState({
    name: "brand",
    serialize: (data) => data.join("-"),
    deserialize: FILTERS_DESERIALIZE,
  });
  const [colorFilters, setColorFilters] = useSearchParamsState({
    name: "color",
    serialize: (data) => data.join("-"),
    deserialize: FILTERS_DESERIALIZE,
  });
  const [sizeFilters, setSizeFilters] = useSearchParamsState({
    name: "size",
    serialize: FILTERS_SERIALIZE,
    deserialize: FILTERS_SIZE_DESERIALIZE,
  });
  const [materialFilters, setMaterialFilters] = useSearchParamsState({
    name: "material",
    serialize: FILTERS_SERIALIZE,
    deserialize: FILTERS_DESERIALIZE,
  });
  const [priceFilters, setPriceFilters] = useSearchParamsState({
    name: "price",
    serialize: FILTERS_SERIALIZE,
    deserialize: FILTERS_DESERIALIZE,
  });
  const [percentFilters, setPercentFilters] = useSearchParamsState({
    name: "percent",
    serialize: FILTERS_SERIALIZE,
    deserialize: FILTERS_DESERIALIZE,
  });

  const [isFiltersOptionsOpen, setIsFiltersOptionsOpen] = useState(!windowSize);
  const [searchQuery, setSearchQuery] = useState("");
  const searchedBrands = useSearch(brands, searchQuery, "name");
  const navigate = useNavigate();
  console.log(sizeFilters);
  const clearEvent = () => {
    setCategoryFilters([]);
    setBrandFilters([]);
    setColorFilters([]);
    setSizeFilters([]);
    setMaterialFilters([]);
    setPriceFilters([]);
    setPercentFilters([]);
    onChangeProductFilter({});
    onChangeModelFilter({});
    navigate({ search: "" });
  };

  return (
    <div className={styles.filters}>
      <div className={styles["filters-nav"]}>
        <Button
          mode="secondary"
          width="100px"
          height="30px"
          onClick={() => {
            setIsFiltersOptionsOpen(true);
            document.body.style.overflowY = "hidden";
          }}
        >
          <div className={styles["filters-nav__opener"]}>
            Filter
            <img src={filtersIcon} alt="" />
          </div>
        </Button>
      </div>
      <AnimatePresence initial={false}>
        {isFiltersOptionsOpen && (
          <>
            {windowSize && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={filtersWrapperVariants}
                transition={{
                  duration: 0.4,
                }}
                className={styles["filters-wrapper"]}
              />
            )}

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={filtersOptionsVariants}
              transition={{
                duration: 0.4,
              }}
              className={`${styles["filters-options"]}`}
            >
              {windowSize && (
                <button
                  className={styles["close-btn"]}
                  onClick={() => {
                    setIsFiltersOptionsOpen(false);
                    document.body.style.overflowY = "unset";
                  }}
                >
                  <img src={closeIcon} alt="close" />
                </button>
              )}

              <Select
                placeholder="Sort by"
                params={sort_params}
                getData={(value) => setSort(value)}
                disabled={!sort ? [1] : []}
              />
              <ClearAll onClear={clearEvent} />

              <Accordion
                fixed={true}
                autoHeight={true}
                header={<div className={styles.accordion}>Category</div>}
              >
                <DropDownList
                  handler={(value) => {
                    setCategoryFilters(value);
                    if (value.length == 0) {
                      updateObject("", "category", onChangeProductFilter);
                      updateObject("", "sub_category", onChangeProductFilter);
                    } else if (value.length === 1) {
                      updateObject(value[0], "category", onChangeProductFilter);
                    } else {
                      updateObject(value[0], "category", onChangeProductFilter);
                      updateObject(
                        value[1],
                        "sub_category",
                        onChangeProductFilter
                      );
                    }
                  }}
                  data={categories}
                  seleted={categoryFilters}
                />
              </Accordion>
              <Accordion
                header={
                  <div className={styles.accordion}>
                    Brands
                    <ClearButton
                      triger={brandFilters.length}
                      handler={() => {
                        setBrandFilters([]);
                        updateObject([], "brand", onChangeProductFilter);
                      }}
                    />
                  </div>
                }
              >
                <Search initial={searchQuery} onChange={setSearchQuery} />
                <br />
                <CheckBoxList
                  data={searchedBrands}
                  checkedItems={brandFilters}
                  handler={(value) => {
                    setBrandFilters(value);
                    updateObject(value, "brand", onChangeProductFilter);
                  }}
                />
              </Accordion>

              <Accordion
                header={
                  <div className={styles.accordion}>
                    Color
                    <ClearButton
                      triger={colorFilters.length}
                      handler={() => {
                        setColorFilters([]);
                        updateObject([], "color", onChangeModelFilter);
                      }}
                    />
                  </div>
                }
              >
                <CheckBoxList
                  data={colors}
                  handler={(value) => {
                    setColorFilters(value);
                    updateObject(value, "color", onChangeModelFilter);
                  }}
                  checkedItems={colorFilters}
                  colored={true}
                />
              </Accordion>
              {type == "accessories" ? null : (
                <Accordion
                  fixed={true}
                  header={
                    <div className={styles.accordion}>
                      Size
                      <ClearButton
                        triger={sizeFilters.length}
                        handler={() => {
                          setSizeFilters([]);
                          updateObject(
                            [],
                            "available_sizes",
                            onChangeModelFilter
                          );
                        }}
                      />
                    </div>
                  }
                  autoHeight={true}
                >
                  <SizeSelect
                    sizes={sizeList}
                    choosed={sizeFilters}
                    handler={(size_data) => {
                      setSizeFilters(size_data);
                      updateObject(
                        size_data,
                        "available_sizes",
                        onChangeModelFilter
                      );
                    }}
                    type="multi"
                  />
                </Accordion>
              )}
              {type === "accessories" ? null : (
                <Accordion
                  header={
                    <div className={styles.accordion}>
                      Material
                      <ClearButton
                        triger={materialFilters.length}
                        handler={() => {
                          setMaterialFilters([]);
                          updateObject([], "material", onChangeProductFilter);
                        }}
                      />
                    </div>
                  }
                >
                  <CheckBoxList
                    data={materials}
                    handler={(value) => {
                      setMaterialFilters(value);
                      updateObject(value, "material", onChangeProductFilter);
                    }}
                    checkedItems={materialFilters}
                  />
                </Accordion>
              )}

              <Accordion
                autoHeight={true}
                header={
                  <div className={styles.accordion}>
                    Price
                    <ClearButton
                      triger={priceFilters.length}
                      handler={() => {
                        setPriceFilters([]);
                        updateObject([], "price", onChangeProductFilter);
                      }}
                    />
                  </div>
                }
              >
                <CheckBoxList
                  data={price_params}
                  handler={(value) => {
                    setPriceFilters(value);
                    updateObject(value, "price", onChangeProductFilter);
                  }}
                  checkedItems={priceFilters}
                />
              </Accordion>
              <Accordion
                autoHeight={true}
                header={
                  <div className={styles.accordion}>
                    Percent Off
                    <ClearButton
                      triger={percentFilters.length}
                      handler={() => {
                        setPercentFilters([]);
                        updateObject([], "discount", onChangeProductFilter);
                      }}
                    />
                  </div>
                }
              >
                <CheckBoxList
                  data={percent_params}
                  handler={(value) => {
                    setPercentFilters(value);
                    updateObject(value, "discount", onChangeProductFilter);
                  }}
                  checkedItems={percentFilters}
                />
              </Accordion>
              <div className={styles["button-bar"]}>
                <Button
                  mode="secondary"
                  height="45px"
                  width="50%"
                  onClick={() => clearEvent()}
                >
                  Clear
                </Button>
                <Button
                  mode="primary"
                  height="45px"
                  width="50%"
                  onClick={() => setIsFiltersOptionsOpen(false)}
                >
                  View results ({productsLength})
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
