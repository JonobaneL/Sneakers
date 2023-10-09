import React from "react";
import styles from "./TopBrands.module.scss";
import Carousel from "../UI/carousel/Carousel";
import { useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/useAsync";
import { getTopBrands } from "../../firebase/AdditionalFirebaseAPI";
import Loader from "../UI/loader/Loader";

const TopBrands = () => {
  const [isBrandsLoading, , brands] = useAsync(getTopBrands, [], "firebase");
  const navigate = useNavigate();
  return (
    <div className={styles.brands}>
      <div className={styles.content}>
        <h2 className={styles.title}>Top Brands</h2>
        {isBrandsLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <Carousel cardsToShow={6} cardGap={15}>
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className={`${styles.brand} ${
                  (index + 1) % 2 == 0 ? styles.accent : ""
                }`}
                onClick={() =>
                  navigate({
                    pathname: "shoes/all",
                    search: `?brand=${brand.name}`,
                  })
                }
              >
                <img src={brand.image} alt={brand.name} />
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default TopBrands;
