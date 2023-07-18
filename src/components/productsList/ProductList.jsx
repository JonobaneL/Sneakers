import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
const ProductsList = ({data}) => {
    return (
        <div className={styles["products-list"]}>
            {
            data.map((item,index)=>
                <ProductsItem key={index} item={item}/>
                )
            }
        </div>
    );
};


export default ProductsList;