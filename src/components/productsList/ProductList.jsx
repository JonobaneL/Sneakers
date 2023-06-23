import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
const ProductsList = ({data}) => {
    const list = [];

    return (
        <div className={`${styles["products-list"]} ${data.length==0?'empty':''}`}>
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