import React from 'react';
import styles from './ShoppingCart.module.scss'
import { shoppingCart } from '../../data/shopping-cart';
const ShoppingCart = () => {
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                <div className={styles.shoes}>
                    {
                        shoppingCart.map(item=>
                            <div key={item.id} className={styles['shoes-item']}>
                                <div className={styles.image}>
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="info">
                                    <p>{item.name}</p>
                                    <p>{item.color}</p>
                                    <p>{item.price}</p>
                                </div>
                            </div>
                            )
                    }
                </div>
                <div className={styles.total}></div>
            </div>
        </div>
    );
};


export default ShoppingCart;