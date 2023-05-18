import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
const ProductsList = ({data}) => {
    return (
        <div className={styles["shoes-list"]}>
            {data.length>0?
            data.map(item=>
                <ProductsItem key={item.id} item={item}/>
                )
            :<div className={styles.warning}>No Result</div>
            }
        </div>
    );
};


export default ProductsList;