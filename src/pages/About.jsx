import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import styles from "./about.module.scss";
import rigthArrow from "../images/right-arrow.svg";
import { useAsync } from "../hooks/useAsync";
import useAllProducts from "../hooks/useAllProducts";
import { useProducts } from "../hooks/useProducts";
import Carousel from "../components/UI/carousel/Carousel";
import { getCurrentUser } from "../firebase/fireAuthAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetOrder, setOrderDate } from "../redux/checkoutSlice";
import {
  expGetModels,
  expGetProducts,
  getProduct,
} from "../firebase/productFirebaseAPI";
import { useGenerateQuery } from "../hooks/useGenerateQuery";
import { updateObject } from "../utils/objectSort";
import { expQuery } from "../firebase/AdditionalFirebaseAPI";

export const aboutLoader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

const About = () => {
  const [option, setOption] = useState(0);
  const [isProductLoading, productErr, product] = useAsync(
    () => getProduct("sCakGNNfSNAHA2FhdlKD"),
    [],
    "firebase"
  );
  console.log(product);
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <br />
        <br />
        <button className={styles.btn} onClick={() => {}}>
          Settings
        </button>

        <br />
      </div>
    </div>
  );
};

export default About;
