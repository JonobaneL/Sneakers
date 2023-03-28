import React from 'react';
import styles from './CarouselCard.module.scss'
import {getFinalPrice} from '../../utils/getFinalPrice'

const CarouselCard = ({data}) => {
    return (
        <div className={styles.card}>
            <img src={data.previewImage} alt={data.name} />
            <p className={styles.brand}>{data.brand}</p>
            <p className={styles.name}>{data.name}</p>
            <div className={styles.price}>
                {(data.discount)?
                    <p className={styles.discountPrice}>${getFinalPrice(data.price,data.discount)}</p>
                    : null
                }
                <p className={data.discount?styles.disabled:''}>${data.price}</p>
                <button className={styles.card__btn}>Buy now</button>
            </div>
        </div>
    );
};


export default CarouselCard;