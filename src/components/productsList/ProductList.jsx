import React from 'react';
import styles from './ProductList.module.scss'
import ProductsItem from '../productsListItem/ProductsItem';
import SkeletonCard from '../UI/skeletonCard/SkeletonCard';
const ProductsList = ({data,isLoading}) => {
    // console.log(data,isLoading)
    return (
        <div className={styles["products-list"]}>
            {
                isLoading
                    ?Array(10).fill(1).map((_,index)=><SkeletonCard key={index}/>)  
                    :data.map((item,index)=>
                        <ProductsItem key={index} item={item}/>
                    )
            }
        </div>
    );
};


export default ProductsList;