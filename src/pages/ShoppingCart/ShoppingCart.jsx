import React, { useState } from 'react';
import styles from './ShoppingCart.module.scss'
import { useRef } from 'react';
import { useShoppingCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import { getCouponDiscount } from '../../utils/getCouponDiscount';
import Toast from '../../components/Toast/Toast';
import { Link } from 'react-router-dom';
import TotalSection from '../../components/TotalSection/TotalSection';
import CInput from '../../components/UI/inputV2/CInput';
const ShoppingCart = () => {
    const {shoppingCart,setCartDiscount,cartDiscount} = useShoppingCart()
    const [CartToast,setCartToast]=useState({
        type:"",
        content:"",
    })
    const [isToastOpen,setToastOpen] = useState(false)
    const couponRef = useRef({});
    const couponHandler = ()=>{
        const discount_res = getCouponDiscount(couponRef.current.value)
        console.log(discount_res)
        if(couponRef.current.value==''){
            setCartToast({type:'warning',content:"Enter coupon"})
            setToastOpen(true)
            return
        }
        if(discount_res==null){
            setCartToast({type:'error',content:"Coupon not found"})
            couponRef.current.value=''
        }
        else{
            setCartDiscount(discount_res)
            setCartToast({type:'success',content:"Coupon was added"})
            couponRef.current.value=''
        }
        setToastOpen(true)
    }
    const removeCoupon = ()=>{
        setCartDiscount(0)
        setCartToast({type:'warning',content:"Coupon was deleted"})
        setToastOpen(true)
    }
    console.log(window.screen.availWidth>768?true:false);
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                {
                    shoppingCart.length>0
                    ?<>
                        <div className={styles.products}>
                            <div className={styles['products-title']}>
                                <p>Added Items</p>
                                <p className={styles['title-size']}>Size</p>
                                <p className={styles['title-color']}>Color</p>
                                <p className={styles['title-quantity']}>Quantity</p>
                                <p className={styles['title-total']}>Total</p>
                            </div>
                            {
                                shoppingCart.map(item=>
                                    <CartItem key={`${item.id}#${item.colorId}#${item.size}`} {...item}/>
                                    )
                            }
                        </div>
                        <div className={styles.total}>
                            <h4 className={styles['coupon-title']}>Have a coupon?</h4>
                            <div className={styles.coupon}>
                                <CInput id="coupon-fullBorder-40" placeholder="Coupon code" ref={couponRef} />
                                <button onClick={couponHandler} className={styles['apply-coupon']}>Apply</button>
                            </div>
                                <TotalSection shippingSection={false} />
                                {
                                   cartDiscount? <p onClick={removeCoupon} className={styles['coupon-remove']}>Remove coupon</p>:null
                                }
                                <Link to='/checkout'><button className={styles['checkout-btn']}>Proceed to Checkout</button></Link>
                        </div>
                    </>
                    :<h2 className={styles["empty-cart"]}>Your cart is empty</h2>
                }
            </div>
            <Toast type={CartToast.type} open={isToastOpen} closeHandler={() => setToastOpen(false)}>
                {CartToast.content}
            </Toast>
        </div>
    );
};


export default ShoppingCart;