import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import styles from "./about.module.scss";
import { useAsync } from "../hooks/useAsync";

import {
  expGetModels,
  expGetProducts,
  expGetProductsTest,
  getProduct,
} from "../firebase/productFirebaseAPI";

export const aboutLoader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

const About = () => {
  const [option, setOption] = useState(0);
  const [isProductLoading, productErr, product] = useAsync(
    expGetProductsTest,
    [],
    "firebase"
  );
  // console.log(product);

  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <br />
        <br />
        <button
          className={styles.btn}
          onClick={() => {
            console.log(product);
          }}
        >
          Settings
        </button>

        <br />
      </div>
    </div>
  );
};

export default About;
