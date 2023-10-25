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
  expGetModels2,
  expGetProducts,
  getProduct,
} from "../firebase/productFirebaseAPI";
import ProductsList from "../components/productsList/ProductList";
import { useGenerateQuery } from "../hooks/useGenerateQuery";

export const aboutLoader = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
};

const About = () => {
  const [option, setOption] = useState(0);

  // console.log(product);
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [error, setError] = useState("");
  const [productsFilter, setProductsFilter] = useState({});
  const [modelsFilter, setModelsFilter] = useState({});
  const productsQuery = useGenerateQuery("products", productsFilter);
  const modelsQuery = useGenerateQuery("products_models", modelsFilter);
  const type = "shoes";
  const male = "men";
  const getProducts = useCallback(() => {
    setIsProductsLoading(true);
    setError(undefined);
    expGetModels2(type, male, modelsQuery)
      .then((response) => {
        const tempModels = [];
        response.forEach((item) => {
          tempModels.push({ modelID: item.id, ...item.data() });
        });
        return tempModels;
      })
      .then((modelsResponse) => {
        setProducts([]);
        modelsResponse.forEach((item) => {
          getProduct(item.productID)
            .then((res) => {
              const tempProduct = res.data();
              setProducts((p) => [
                ...p,
                {
                  id: res.id,
                  ...tempProduct,
                  ...item,
                },
              ]);
            })
            .catch((err) => console.log(err));
        });
      })
      // .then((productsResponse) => {
      //   productsResponse.forEach((product) => {
      //     expGetModels(product.id, modelsQuery)
      //       .then((response) => {
      //         const tempProducts = [];
      //         response.forEach((item) => {
      //           tempProducts.push({
      //             modelID: item.id,
      //             ...product,
      //             ...item.data(),
      //           });
      //         });
      //         return tempProducts;
      //       })
      //       .then((products) => {
      //         setProducts((p) => [...p, ...products]);
      //       });
      //   });
      // })
      .finally(() => {
        setIsProductsLoading(false);
      });
  }, [Object.keys(productsFilter).length, modelsFilter]);
  useEffect(() => {
    setModelsFilter({
      color: ["Brown"],
    });
    console.log("first useEffect");
  }, []);
  // useEffect(() => {
  //   console.log(products);
  // }, [products.length]);
  // console.log(products);

  useEffect(() => {
    console.log("second useEffect");
    console.log(productsFilter);
    setProducts([]);
    getProducts();
  }, [getProducts]);
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <br />
        <br />
        <button
          className={styles.btn}
          onClick={() => {
            setProductsFilter({
              brand: ["Converse"],
            });
          }}
        >
          Settings
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            setProductsFilter({});
          }}
        >
          Clear
        </button>
        {isProductsLoading == false ? (
          products.map((item, index) => (
            <div style={{ display: "flex", gap: "20px" }} key={index}>
              <h3>{item?.name}</h3>
              <h3 style={{ fontWeight: 500, color: "green" }}>
                {item.model_name}
              </h3>
            </div>
          ))
        ) : (
          <h1>LOADING...</h1>
        )}
        {/* <ProductsList data={products} isLoading={isProductsLoading} /> */}

        <br />
      </div>
    </div>
  );
};

export default About;
