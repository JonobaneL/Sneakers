import React from 'react';
import Rate from '../UI/rate/Rate';
import styles from './ProductsItem.module.scss'
import { getFinalPrice } from '../../utils/getFinalPrice';
import { Link, useParams } from 'react-router-dom';
const ShoesItem = ({item}) => {
    const {type,male} = useParams()
    return (
        <Link to={`/product/${item.id}/${item.models[0]}`} state={{type,male}}>
        <div className={styles.item}>
            <img src={item.p_image} alt={item.name} />
            <p className={styles.brand}>{item.brand}</p>
            <p className={styles.name}>{item.name}</p>
            {item.f_rate?<Rate rateIndex={item.f_rate} width='80px' />:''}
            <div className={styles.price}>
                {(item.f_discount>0)?
                        <p className={styles.price__discount}>${getFinalPrice(item.price,item.f_discount)}</p>
                        : null
                }
                <p className={item.f_discount?styles.price__disabled:''}>${item.price}</p>

            </div>
        </div>
        </Link>
    );
};


export default ShoesItem;