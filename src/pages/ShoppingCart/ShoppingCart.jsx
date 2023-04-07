import React, { useState } from 'react';
import styles from './ShoppingCart.module.scss'
import { useRef } from 'react';
import { useShoppingCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import SInput from '../../components/UI/input/SInput';
import { useShoes } from '../../hooks/useShoes';
import { getFinalPrice } from '../../utils/getFinalPrice';
import { getCouponDiscount } from '../../utils/getCouponDiscount';
import Toast from '../../components/Toast/Toast';
import Accordion from '../../components/UI/accordion/Accordion';
const ShoppingCart = () => {
    const {shoppingCart} = useShoppingCart()
    const [discount,setDiscount] = useState(0)
    const [CartToast,setCartToast]=useState({
        type:"",
        content:"",
    })
    const [isToastOpen,setToastOpen] = useState(false)
    const couponRef = useRef();
  
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
            setDiscount(discount_res)
            setCartToast({type:'success',content:"Coupon was added"})
            couponRef.current.value=''
        }
        setToastOpen(true)
    }
    const total = shoppingCart.reduce((total,cartItem)=>{
        const item = useShoes(cartItem.id,cartItem.colorId);
        return total+(item?.cost||0)*cartItem.quantity;
    },0);
    console.log("Cart = ",shoppingCart)
    console.log(window.screen.availWidth>768?true:false);
    // const [couponOpen, setCoupon] = useState()
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                {
                    shoppingCart.length>0
                    ?<>
                        <div className={styles.shoes}>
                            <div className={styles['shoes-title']}>
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
                            <Accordion fixed={window.screen.availWidth>768?true:false} title="Have coupon?">
                                <div className={styles.coupon}>
                                    <SInput height='100%' params={{placeholder:'Coupon code',ref:couponRef}}/>
                                    <button onClick={couponHandler} className={styles.apply_btn}>Apply</button>
                                </div>
                            </Accordion>
                            <div className={styles.cost}>
                                <ul className={styles.info}>
                                    <li>
                                        <p className={styles.parameter}>Total price:</p>
                                        <p>${(total).toFixed(2)}</p>
                                    </li>
                                    <li>
                                        <p className={styles.parameter}>Discount:</p>
                                        <p>{discount}{discount>0?"%":null}</p>
                                    </li>
                                    <li>
                                        <p className={styles.parameter}>Total:</p>
                                        <p className={styles.total__cost}>${getFinalPrice(total,discount)}</p>
                                    </li>
                                </ul>
                            </div>
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