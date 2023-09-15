import { useState } from 'react';
import styles from './Checkout.module.scss'
import RadioList from '../../components/RadioList/RadioList';
import PayPalIcon from '../../images/PayPal-icon.svg'
import CreditCardFrom from '../../components/CreditCardForm/CreditCardFrom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import CheckoutCustomer from '../../components/CheckoutCustomer/CheckoutCustomer';
import CheckoutShipping from '../../components/CheckoutShipping/CheckoutShipping';
import Accrodion from '../../components/UI/accordion/Accordion';
import Button from '../../components/UI/button/Button';
import EditButton from '../../components/UI/editButton/EditButton';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../firebase/fireAuthAPI';
import MethodsList from '../../components/MedhodsList/MethodsList';
import AddressesList from '../../components/AddressesList/AddressesList';
import { useDispatch, useSelector } from 'react-redux';
import { addNewOrder } from '../../firebase/ordersFirebaseAPI';
import { clearCart } from '../../redux/cartSlice';
import { decreaseProductsAmount } from '../../utils/productsAmount';

const Checkout = () => {
    const {currentUser} = useAuth();
    const userInfo = getUser(currentUser?.uid?currentUser.uid:'user')
    const windowWidth = window.screen.availWidth;
    const firstName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const lastName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:'Please enter a valid email address',isEmail:'Please enter a valid email address'})
    const phoneNumber = useInput('',{isEmpty:true},{isEmpty:'Please enter your phone number'})
    const [cardUse,setCardUse] = useState(false);
    const [addressUse,setAddressUse] = useState(false);//shipping
    const [cardData,setCardData] = useState({cartNumber:'',date:'',cvv:''})
    const [addressData,setAddressData] = useState({address:'',appartment:''});//shipping
    const [paymentMethod,setPaymentMethod] = useState('')
    const cart = useSelector(state=>state.cartReducer);
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
                shipping:addressData,
                city:userInfo.city.name,
                paymentMethod:paymentMethod,
                card:cardData,
                status:'Ordered',
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
                <div className={styles.shipping}>
                    <h2 className={styles['section-title']}>Shipping</h2>
                    {
                        (userInfo?.delivery_addresses && !addressUse)?<>
                            <div>
                                <AddressesList 
                                    addresses={userInfo.delivery_addresses} 
                                    triger={false}
                                    callback={value=>setAddressData(value)}
                                />
                            </div>
                            <div className={styles.another}>
                                <p
                                    onClick={()=>{
                                        setAddressData({address:'',appartment:''})
                                        setAddressUse(true);
                                    }}
                                >Use Another Address</p>
                            </div>
                            
                        </>
                        :<>
                            <CheckoutShipping city={userInfo?.city} address={addressData} onChange={setAddressData} />
                            {
                                currentUser&&<div className={styles["button-bar"]}>
                                    <Button 
                                        mode='secondary'
                                        width='140px'
                                        height='45px' 
                                        onClick={()=>setAddressUse(false)}   
                                    >Cancel</Button>
                                </div>
                            }
                            
                        </>
                    }
                </div>
                <div className={styles.payment}>
                    <h2 className={styles['section-title']}>Payment</h2>
                    <RadioList list={[
                            {id:'upon-receipt',label:'Payment upon receipt of goods',value:'Payment upon receipt of goods'},
                            {id:'by-card',label:'Credit or Debit Card',value:'Credit or Debit Card'},
                            {id:'paypal',label:<img src={PayPalIcon} alt='PayPal' style={{width:'100px'}} />,value:'PayPal'},
                        ]}
                        groupName='payment'
                        callback={value=>{
                            setPaymentMethod(value)
                            setCardData({cartNumber:'',date:'',cvv:''})
                        
                        }}
                    >
                        <></>
                        <div className={styles['payment-option']}>
                            {
                                (userInfo?.payment_methods && !cardUse)?<><div className={styles.list}>
                                        <MethodsList 
                                            methods={userInfo.payment_methods} 
                                            triger={false} 
                                            callback={value=>setCardData(value)}
                                        />
                                    </div>
                                    <div className={styles.another}>
                                        <p
                                            onClick={()=>{
                                                setCardUse(p=>!p)
                                                setCardData({cartNumber:'',date:'',cvv:''})
                                            }}
                                        >Use Another Card</p>
                                    </div>
                                </>
                                :<><div className={`${styles['card-form']} ${cardUse?styles.active:''}`}>
                                        <CreditCardFrom cardData={cardData} callback={setCardData} />
                                    </div>
                                    {
                                        currentUser&&<div className={styles["button-bar"]}>
                                            <Button 
                                                mode='secondary'
                                                width='140px'
                                                height='45px' 
                                                onClick={()=>setCardUse(false)}   
                                            >Cancel</Button>
                                        </div>
                                    }
                                </>
                            }
                            
                        </div>
                        <></>
                    </RadioList>
                </div>
                <div className={styles["button-bar"]}>
                    <Button
                        mode='primary'
                        width='160px'
                        height='45px'
                        disabled={isOrderLoading}
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