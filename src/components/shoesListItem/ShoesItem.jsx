import React from 'react';
import Rate from '../UI/rate/Rate';
import styles from './ShoesItem.module.scss'
const ShoesItem = ({item}) => {
    return (
        <div className={styles.item}>
            <img src={item.previewImage} alt={item.name} />
            {/* <div className={styles.info}> */}
                <p className={styles.brand}>{item.brand}</p>
                <p className={styles.name}>{item.name}</p>
                <Rate rateIndex={item.colors[0].rate} width='80px' />
                <p className={styles.price}>${item.price}</p>
            {/* </div> */}
        </div>
    );
};


export default ShoesItem;