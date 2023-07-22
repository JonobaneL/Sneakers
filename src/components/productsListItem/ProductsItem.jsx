import React from 'react';
import Rate from '../UI/rate/Rate';
import styles from './ProductsItem.module.scss'
import { getFinalPrice } from '../../utils/getFinalPrice';
import { Link } from 'react-router-dom';
const ProductItem = ({item}) => {
    return (
        <Link to={`/product/${item.productID}/${item.modelID}`}>
        <div className={styles.item}>
            <img src={item.images[1]} alt={item.name} loading='lazy' />
            <p className={styles.brand}>{item.brand}</p>
            <p className={styles.name}>{item.name}</p>
            {item.rate?<Rate rateIndex={item.rate} width='80px' />:''}
            <div className={styles.price}>
                {(item.discount>0)?
                        <p className={styles.price__discount}>${getFinalPrice(item.price,item.discount)}</p>
                        : null
                }
                <p className={item.discount?styles.price__disabled:''}>${item.price}</p>

            </div>
        </div>
        </Link>
    );
};


export default ProductItem;