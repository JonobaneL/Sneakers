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
const ShoppingCart = () => {
    const {shoppingCart} = useShoppingCart()
    const [discount,setDiscount] = useState(0)
    const [CartToast,setCartToast]=useState({
        type:"",
        content:"",
    })
    const [isToastOpen,setToastOpen] = useState(false)
    const couponRef = useRef();
   
    const getTotal = ()=>{
        return shoppingCart.reduce((total,cartItem)=>{
            const item = useShoes(cartItem.id,cartItem.colorId);
            return total+(item?.cost||0)*cartItem.quantity;
        },0)
    }
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
    const total = getTotal();
    console.log("Cart = ",shoppingCart)
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                <div className={styles.shoes}>
                    {
                        shoppingCart.map(item=>
                            <CartItem key={`${item.id}#${item.colorId}#${item.size}`} {...item}/>
                            )
                    }
                </div>
                <div className={styles.total}>
                    <div className={styles.coupon}>
                        <h3 className={styles.coupon__title}>Have coupon?</h3>
                        <div className={styles.coupon__field}>
                            <SInput height='100%' params={{placeholder:'Coupon code',ref:couponRef}}/>
                            <button onClick={couponHandler} className={styles.apply_btn}>Apply</button>
                        </div>
                    </div>
                    <div className={styles.cost}>
                        <ul className={styles.info}>
                            <li>
                                <p>Total price:</p>
                                <p>${(total).toFixed(2)}</p>
                            </li>
                            <li>
                                <p>Discount:</p>
                                <p>{discount}{discount>0?"%":null}</p>
                            </li>
                            <li>
                                <p>Total:</p>
                                <p className={styles.total__cost}>${getFinalPrice(total,discount)}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Toast type={CartToast.type} open={isToastOpen} closeHandler={() => setToastOpen(false)}>
                {CartToast.content}
            </Toast>
        </div>
    );
};


export default ShoppingCart;