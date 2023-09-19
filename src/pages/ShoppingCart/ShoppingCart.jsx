import React from 'react';
import styles from './ShoppingCart.module.scss'
import CartItem from '../../components/CartItem/CartItem';
import { Link } from 'react-router-dom';
import TotalSection from '../../components/TotalSection/TotalSection';
import Button from '../../components/UI/button/Button';
import { useSelector } from 'react-redux';
import Loader from '../../components/UI/loader/Loader';
import CouponForm from '../../components/CouponForm/CouponForm';

const ShoppingCart = () => {
    
    const cart = useSelector(state=>state.cartReducer);
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                {
                    cart.isLoading?
                    <div className={styles.loader}><Loader/></div> 
                    :cart.shoppingCart.length>0
                    ?<>
                        <div className={styles.products}>
                            <div className={styles['products-title']}>
                                <span>Added Items</span>
                                <div></div>
                                <p className={styles['title-size']}>Size</p>
                                <p className={styles['title-color']}>Color</p>
                                <p className={styles['title-quantity']}>Quantity</p>
                                <p className={styles['title-total']}>Total</p>
                            </div>
                            {
                                cart.shoppingCart.map((item)=><CartItem key={`${item.productID}${item.modelID}${item.size}`} {...item} />)
                            }
                        </div>
                        <div className={styles.total}>
                            <CouponForm/>
                                <TotalSection 
                                    shippingSection={false}
                                    total={cart.cartTotal}
                                    subTotal={cart.cartSubTotal}
                                    discount={cart.cartDiscount}    
                                />
                                <div className={styles.checkout}>
                                    <Link to='/checkout'>
                                        <Button
                                            mode='primary'
                                            height='40px'
                                            width='100%'
                                        >Proceed to Checkout</Button>
                                    </Link>
                                </div>
                        </div>
                    </>
                    :<h2 className={styles["empty-cart"]}>Your cart is empty</h2>
                }
            </div>
        </div>
    );
};

export default ShoppingCart;