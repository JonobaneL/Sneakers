import React from "react";
import styles from "./SearchCard.module.scss";
import { Link } from "react-router-dom";
import { getFinalPrice } from "../../utils/getFinalPrice";

const SearchCard = ({ product, onChange, onChangeQuery }) => {
  const titleEvent = (male, type) => {
    return `${!male ? "" : male !== "kids" ? `${male}'s` : `${male}'`} ${type}`;
  };
  return (
    <Link
      key={`${product.productID}/${product.modelID}`}
      to={`/product/${product.productID}/${product.modelID}`}
      onClick={() => {
        onChange(false);
        onChangeQuery("");
      }}
    >
      <div className={styles.product}>
        <img src={product.images[1]} alt={product.name} />
        <p className={styles.name}>{product.name}</p>
        <p className={styles.type}>{titleEvent(product.male, product.type)}</p>
        <div className={styles.price}>
          {product.discount > 0 ? (
            <p className={styles.price__discount}>
              ${getFinalPrice(product.price, product.discount)}
            </p>
          ) : null}
          <p className={product.discount ? styles.price__disabled : ""}>
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
