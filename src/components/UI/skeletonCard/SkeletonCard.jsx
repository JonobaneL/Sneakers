import React from 'react';
import styles from './SkeletonCard.module.scss'

const SkeletonCard = () => {
    return (
        <div className={styles['skeleton-card']}>
            <div className={styles.img}/>
            <div className={styles.text}>
                <div className={styles.brand}/>
                <div className={styles.name}/>
                <div className={styles.rate}/>
                <div className={styles.price}/>
            </div>
        </div>
    );
};


export default SkeletonCard;