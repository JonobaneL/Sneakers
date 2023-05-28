import React from 'react';
import Rate from '../UI/rate/Rate';
import styles from './ProductsItem.module.scss'
import { getFinalPrice } from '../../utils/getFinalPrice';
import { Link, useParams } from 'react-router-dom';
const ShoesItem = ({item}) => {
    const {type,male} = useParams()
    return (
        <Link to={`/product/${item.id}/${item.colors[0].id}`} state={{type,male}}>
        <div className={styles.item}>
            <img src={item.previewImage} alt={item.name} />
            <p className={styles.brand}>{item.brand}</p>
            <p className={styles.name}>{item.name}</p>
            {item.colors[0].rate?<Rate rateIndex={item.colors[0].rate} width='80px' />:''}
            <div className={styles.price}>
                {(item.discount)?
                        <p className={styles.price__discount}>${getFinalPrice(item.price,item.discount)}</p>
                        : null
                }
                <p className={item.discount?styles.price__disabled:''}>${item.price}</p>

            </div>
        </div>
        </Link>
    );
};


export default ShoesItem;