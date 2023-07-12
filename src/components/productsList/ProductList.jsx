import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
const ProductsList = ({data}) => {
    return (
        <div className={styles["products-list"]}>
            {
            data.map(item=>
                <ProductsItem key={item.id} item={item}/>
                )
            }
        </div>
    );
};


export default ProductsList;