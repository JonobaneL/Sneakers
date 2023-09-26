import { useState } from 'react';
import styles from './Checkout.module.scss'
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import CheckoutCustomer from '../../components/CheckoutCustomer/CheckoutCustomer';
import Accrodion from '../../components/UI/accordion/Accordion';
import Button from '../../components/UI/button/Button';
import EditButton from '../../components/UI/editButton/EditButton';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../firebase/fireAuthAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrder } from '../../firebase/ordersFirebaseAPI';
import { clearCart } from '../../redux/cartSlice';
import { decreaseProductsAmount } from '../../utils/productsAmount';
import CheckoutShipping from '../../components/CheckoutShipping/CheckoutShipping';
import CheckoutPayment from '../../components/CheckoutPayment/CheckoutPayment';
import { resetOrder } from '../../redux/checkoutSlice';
import { checkCheckout } from '../../utils/checkCheckoutInfo';

const Checkout = () => {
    const {currentUser} = useAuth();
    const userInfo = getUser(currentUser?.uid?currentUser.uid:'user')
    const windowWidth = window.screen.availWidth;
    const firstName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const lastName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:'Please enter a valid email address',isEmail:'Please enter a valid email address'})
    const phoneNumber = useInput('',{isEmpty:true},{isEmpty:'Please enter your phone number'})
    const cart = useSelector(state=>state.cartReducer);
    const checkout = useSelector(state=>state.checkoutReducer);
    const [isOrderLoading,setIsOrderLoading]= useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderHandler= async() =>{
        const orderDate = new Date()
        const orderID = currentUser?`U${Date.now()}`:`A${Date.now()}`
        try{
            setIsOrderLoading(true)
            await addNewOrder({
                orderID:orderID,
                userID:currentUser?currentUser.uid:`anonym`,
                firstName:firstName.value,
                lastName:lastName.value,
                email:email.value,
                phoneNumber:phoneNumber.value,
                ...checkout,
                sortDate:`${orderDate.getMonth()+1}/${orderDate.getFullYear()}`,
                date:`${orderDate.getDate()}/${orderDate.getMonth()+1}/${orderDate.getFullYear()}`,
                userCart:{
                    shoppingCart:cart.shoppingCart,
                    cartQuantity:cart.cartQuantity,
                    cartSubTotal:cart.cartSubTotal,
                    cartTotal:cart.cartTotal,
                    cartDiscount:cart.cartDiscount
                },
            })
            decreaseProductsAmount(cart.shoppingCart)
            dispatch(clearCart());
            dispatch(resetOrder())
            navigate(`/order-info/${orderID}`)
        }catch(err){
            console.log(err.message)
        }
        finally{
            setIsOrderLoading(false)
        }
    }

    return <div className={styles.checkout}>
        <div className={styles.content}>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles["order-form"]}>
                {
                    windowWidth<=900
                    ?<div className={styles.bag}>
                        <Accrodion
                            header={<h2 className={styles['section-title']}>In your bag</h2>}
                            autoHeight={true}
                        >
                            <div className={styles.productList}>
                                <Link to='/shopping-cart'>
                                    <EditButton>Edit</EditButton>
                                </Link>
                                <OrdreSummaryList cart={cart.shoppingCart}/>
                                
                            </div>
                            <TotalSection 
                                borders={false}
                                total={cart.cartTotal}
                                subTotal={cart.cartSubTotal}
                                discount={cart.cartDiscount}
                            />

                        </Accrodion>
                    </div>
                    :null
                }
                <div className={styles.customer}>
                    <h2 className={styles['section-title']}>Customer</h2>
                    <CheckoutCustomer firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} />
                </div>
                <CheckoutShipping user={userInfo}/>
                <CheckoutPayment user={userInfo}/>
                <div className={styles["button-bar"]}>
                    <Button
                        mode='primary'
                        width='160px'
                        height='45px'
                        disabled={checkCheckout([isOrderLoading,firstName.isValid,lastName.isValid,email.isValid,phoneNumber.isValid])}
                        onClick={orderHandler}
                    >Place Order</Button>
                </div>
            </div>
            <div className={styles.cart}>
                <h3 className={styles['cart__title']}>Order Summary</h3>
                <TotalSection
                    total={cart.cartTotal}
                    subTotal={cart.cartSubTotal}
                    discount={cart.cartDiscount}
                />
                <div className={styles.productList}>
                    <div className={styles.productList__edit}>
                        <Link to='/shopping-cart'>
                            <EditButton>Edit</EditButton>
                        </Link>
                    </div>
                    <OrdreSummaryList cart={cart.shoppingCart} />
                </div>
            </div>
        </div>
    </div>;
}
 
export default Checkout;