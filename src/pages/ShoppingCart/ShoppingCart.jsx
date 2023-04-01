import React from 'react';
import styles from './ShoppingCart.module.scss'
import { useState } from 'react';
import { useShoppingCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';

const ShoppingCart = () => {
    const {shoppingCart} = useShoppingCart()
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                <div className={styles.shoes}>
                    {
                        shoppingCart.map(item=>
                            <CartItem key={item.id} {...item}/>
                            )
                    }
                </div>
                <div className={styles.total}></div>
            </div>
        </div>
    );
};


export default ShoppingCart;