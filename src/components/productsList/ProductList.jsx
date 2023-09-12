import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
import SkeletonCard from '../UI/skeletonCard/SkeletonCard';
const ProductsList = ({data,isLoading}) => {
    return (
        <div className={styles["products-list"]}>
            {
                isLoading
                    ?Array(10).fill(1).map((_,index)=><SkeletonCard key={index}/>)  
                    :data.length>0
                    ?data.map((item,index)=>
                        <ProductsItem key={index} item={item}/>
                    )
                    :<p>NoResult</p>
            }
        </div>
    );
};


export default ProductsList;