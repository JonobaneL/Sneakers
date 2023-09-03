import React, { useState,useRef } from 'react';
import styles from './ShoppingCart.module.scss'
import CartItem from '../../components/CartItem/CartItem';
import Toast from '../../components/ToastV2/Toast';
import { Link } from 'react-router-dom';
import TotalSection from '../../components/TotalSection/TotalSection';
import CInput from '../../components/UI/input/CInput';
import Button from '../../components/UI/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setDiscount } from '../../redux/cartSlice';
import Loader from '../../components/UI/loader/Loader';
import { getCoupon } from '../../firebase/cartFirebaseAPI';
const ShoppingCart = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cartReducer);
    const [CartToast,setCartToast]=useState({
        type:"",
        content:"",
    })

    const [isToastOpen,setToastOpen] = useState(false)
    const couponRef = useRef({});

    const couponHandler = async()=>{
        let discount_res = null;
        try{
            const response = await getCoupon(couponRef.current.value)
            response.forEach(item=>discount_res = item.data())
        }
        catch(err){
            console.log(err)
        }
        if(couponRef.current?.value==''){
            setCartToast({type:'warning',content:"Enter coupon"})
            setToastOpen(true)
            return
        }
        
        if(discount_res==null){
            setCartToast({type:'error',content:"Coupon not found"})
            couponRef.current.value = '';
        }
        else{
            dispatch(setDiscount(discount_res.value))
            setCartToast({type:'success',content:"Coupon was added"})
            couponRef.current.value = '';
        }
        setToastOpen(true)
    }

    const removeCoupon = ()=>{
        dispatch(setDiscount(0))
        setCartToast({type:'warning',content:"Coupon was deleted"})
        setToastOpen(true)
    }
    return (
        <div className={styles['shopping-cart']}>
            <div className={styles.content}>
                {
                    cart.isLoading?
                    <div className={styles.loader}><Loader/></div> //пофіксити
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
                                <TotalSection 
                                    shippingSection={false}
                                    total={cart.cartTotal}
                                    subTotal={cart.cartSubTotal}
                                    discount={cart.cartDiscount}    
                                />
                                {
                                   cart.cartDiscount? <p onClick={removeCoupon} className={styles['coupon-remove']}>Remove coupon</p>:null
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