import React from 'react';
import styles from './Card.module.scss'

const Card = ({data}) => {
    console.log(data)
    return (
        <div className={styles.card}>
            <img src={data.image} alt={data.name} />
            <div className={styles.info}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.price}>{data.price}</p>
            </div>
        </div>
    );
};


export default Card;