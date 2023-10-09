import { useEffect, useState } from "react";
import {
  getBrands,
  getCategories,
  getColors,
  getMaterials,
  getSizeList,
} from "../firebase/productFirebaseAPI";
import { objectSort } from "./objectSort";
import { useAsync } from "../hooks/useAsync";

const sort_params = [
  { id: 1, value: "Featured" },
  { id: 2, value: "Newest" },
  { id: 3, value: "Price: High to Low" },
  { id: 4, value: "Price: Low to High" },
  { id: 5, value: "Percent Off" },
];
const price_params = [
  { id: 1, name: "Under $30" },
  { id: 2, name: "$30 to $50" },
  { id: 3, name: "$50 to $75" },
  { id: 4, name: "$75+" },
];
const percent_params = [
  { id: 1, name: "Up to 30%" },
  { id: 2, name: "30% to 50%" },
  { id: 3, name: "50%+" },
];

export const productsFilterParrams = (type, male) => {
  const [categories, setCategories] = useState([]);
  const [, , brands] = useAsync(() => getBrands(male), [male], "firebase");
  const [materials, setMaterials] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [, , colors] = useAsync(getColors, [], "firebase");

  useEffect(() => {
    getCategories(type, male)
      .then((categoryResponse) => {
        const filteredCategories = [];
        categoryResponse.forEach((item) => {
          const category = item.data();
          filteredCategories.push({ id: item.id, ...category });
        });
        return filteredCategories;
      })
      .then((filteredCategories) => {
        const gropedCategory = objectSort(filteredCategories);
        setCategories(gropedCategory);
      });

    if (type !== "accessories") {
      getMaterials(male).then((response) => {
        response.forEach((item) => {
          const material = item.data();
          setMaterials((p) => [...p, { id: item.id, ...material }]);
        });
      });
      getSizeList().then((response) => {
        response.forEach((item) => {
          const size = item.data();
          setSizeList((p) => [...p, size]);
        });
      });
    } else {
      setMaterials([]);
      setSizeList([]);
    }
  }, [type, male]);

  return {
    categories,
    brands,
    materials,
    sizeList,
    colors,
    sort_params,
    price_params,
    percent_params,
  };
};
