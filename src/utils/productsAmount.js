import {
  getProductModel,
  updateProductAmount,
} from "../firebase/productFirebaseAPI";

const sizeCheck = (size, available_sizes) => {
  if (size.amount > 0) {
    if (!available_sizes.includes(size.size)) {
      return true;
    }
  } else {
    if (available_sizes.includes(size.size)) {
      return false;
    }
  }
};

export const decreaseProductsAmount = (products) => {
  products.map((item) => {
    getProductModel(item.modelID)
      .then((data) => {
        return data.data();
      })
      .then((product) => {
        const currentSizes = product.sizes.map((product_size) => {
          if (product_size.size === item.size) {
            return {
              ...product_size,
              amount: product_size.amount - item.quantity,
            };
          } else return product_size;
        });

        const available_sizes = [];
        currentSizes.forEach((item) => {
          if (item.amount > 0) {
            if (!available_sizes.includes(item.size)) {
              available_sizes.push(item.size);
            }
          } else {
            if (available_sizes.includes(item.size)) {
              available_sizes.filter(
                (a_size) => a_size.toString() != item.size
              );
            }
          }
        });
        return [currentSizes, available_sizes];
      })
      .then((sizes) => {
        updateProductAmount(item.modelID, sizes[0], sizes[1]).catch((err) =>
          console.log(err)
        );
      });
  });
};
