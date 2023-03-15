import React from 'react';
import Rate from '../UI/rate/Rate';
import styles from './ShoesItem.module.scss'
import { getFinalPrice } from '../../utils/getFinalPrice';
const ShoesItem = ({item}) => {
    return (
        <div className={styles.item}>
            <img src={item.previewImage} alt={item.name} />
            <p className={styles.brand}>{item.brand}</p>
            <p className={styles.name}>{item.name}</p>
            {item.colors[0].rate?<Rate rateIndex={item.colors[0].rate} width='80px' />:''}
            <div className={styles.price}>
                {(item.colors[0].discount)?
                        <p className={styles.price__discount}>${getFinalPrice(item.price,item.colors[0].discount)}</p>
                        : null
                }
                <p className={item.colors[0].discount?styles.price__diabled:''}>${item.price}</p>

            </div>
        </div>
    );
};


export default ShoesItem;