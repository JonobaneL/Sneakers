import React, { useState,useRef } from 'react';
import styles from './ShoppingCart.module.scss'
import { useShoppingCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import { getCouponDiscount } from '../../utils/getCouponDiscount';
import Toast from '../../components/ToastV2/Toast';
import { Link } from 'react-router-dom';
import TotalSection from '../../components/TotalSection/TotalSection';
import CInput from '../../components/UI/input/CInput';
import Button from '../../components/UI/button/Button';
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
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                {
                    shoppingCart.length>0
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
                                shoppingCart.map(item=>
                                    <CartItem key={`${item.id}#${item.colorId}#${item.size}`} {...item}/>
                                    )
                            }
                        </div>
                        <div className={styles.total}>
                            <h4 className={styles['coupon-title']}>Have a coupon?</h4>
                            <div className={styles.coupon}>
                                <CInput 
                                    id="coupon"
                                    placeholder="Coupon code" 
                                    ref={couponRef}
                                />
                                <div className={styles['apply-coupon']}>
                                    <Button
                                        mode='primary'
                                        height='40px'
                                        width='75px'
                                        onClick={couponHandler}
                                    >Apply</Button>
                                </div>
                                
                            </div>
                                <TotalSection shippingSection={false} />
                                {
                                   cartDiscount? <p onClick={removeCoupon} className={styles['coupon-remove']}>Remove coupon</p>:null
                                }
                                <div className={styles.checkout}>
                                    <Link to='/checkout'>
                                        <Button
                                            mode='primary'
                                            height='40px'
                                            width='100%'
                                            onClick={couponHandler}
                                        >Proceed to Checkout</Button>
                                    </Link>
                                </div>
                                
                        </div>
                    </>
                    :<h2 className={styles["empty-cart"]}>Your cart is empty</h2>
                }
            </div>
            <Toast type={CartToast.type} title={CartToast.content} triger={isToastOpen} closeHandler={setToastOpen}/>
        </div>
    );
};


export default ShoppingCart;