import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../utils/getProduct';
import backIcon from '../../images/back-icon.svg'
import Rate from '../../components/UI/rate/Rate';
import styles from './ShoeDetails.module.scss'

const ShoeDetails = () => {
    const {id} = useParams();
    const product = getProductById(id)
    console.log(product)
    return (
        <div className={styles['shoe-details']}>
            <div className={styles.back}>
                <div className={styles["back-content"]}>
                    <img className={styles.content__icon} src={backIcon} alt="back" />
                    <Link to={'/'} className={styles.content__title}>Back to Results</Link>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles["product-images"]}>
                    <img src={product.colors[0].images[0]} alt="" />
                </div>
                <div className={styles["product-info"]}>
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <Rate rateIndex={product.colors[0].rate} width='100px' />
                    <p>Color: {product.colors[0].title}</p>
                </div>
                
            </div>
        </div>
    );
};


export default ShoeDetails;