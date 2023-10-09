import { getFinalPrice } from "./getFinalPrice";

export const priceSort = (arr, type = "lowTohigh") => {
  if (arr.length <= 1) {
    return arr;
  }
  const centerIndex = Math.floor(arr.length / 2);
  const centerElement = arr[centerIndex];
  const lessArr = [];
  const greaterArr = [];
  if (type == "lowTohigh") {
    for (let i = 0; i < arr.length; i++) {
      if (i == centerIndex) continue;
      if (getFinalPrice(arr[i].price, arr[i].discount) < centerElement.price) {
        lessArr.push(arr[i]);
      } else {
        greaterArr.push(arr[i]);
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (i == centerIndex) continue;
      if (getFinalPrice(arr[i].price, arr[i].discount) > centerElement.price) {
        lessArr.push(arr[i]);
      } else {
        greaterArr.push(arr[i]);
      }
    }
  }
  return [
    ...priceSort(lessArr, type),
    centerElement,
    ...priceSort(greaterArr, type),
  ];
};
