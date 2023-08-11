import { useState } from 'react';
import styles from './Checkout.module.scss'
import RadioList from '../../components/RadioList/RadioList';
import PayPalIcon from '../../images/PayPal-icon.svg'
import CreditCardFrom from '../../components/CreditCardForm/CreditCardFrom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import CheckoutCustomer from '../../components/CheckoutCustomer/CheckoutCustomer';
import CheckoutShipping from '../../components/CheckoutShipping/CheckoutShipping';
import Accrodion from '../../components/UI/accordion/Accordion';
import Button from '../../components/UI/button/Button';
import EditButton from '../../components/UI/editButton/EditButton';
import { useAuth } from '../../context/AuthContext';
import { getUser } from '../../fireAuthAPI';
import MethodsList from '../../components/MedhodsList/MethodsList';
import CInput from '../../components/UI/input/CInput';
import AddressesList from '../../components/AddressesList/AddressesList';

const Checkout = () => {
    const [currentCity,setCurrentCity] = useState({})
    const {currentUser} = useAuth();
    const userInfo = getUser(currentUser?.uid?currentUser.uid:'user')
    const windowWidth = window.screen.availWidth;
    const firstName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const lastName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:'Please enter a valid email address',isEmail:'Please enter a valid email address'})
    const phoneNumber = useInput('',{isEmpty:true},{isEmpty:'Please enter your phone number'})
    const [cardUse,setCardUse] = useState(false);
    const [addressUse,setAddressUse] = useState(false);
    const [cardData,setCardData] = useState({cartNumber:'',date:'',cvvNumber:''})
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
                                <OrdreSummaryList/>
                            </div>
                            <TotalSection borders={false}/>

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
                                    callback={value=>console.log(value)}
                                />
                            </div>
                            <p
                                className={styles.another}
                                onClick={()=>setAddressUse(p=>!p)}
                            >Use Another Address</p>
                        </>
                        :<>
                            <CheckoutShipping city={userInfo?.city_1} />
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
                    {/* {
                        addressUse&&<CheckoutShipping />
                    } */}
                </div>
                <div className={styles.payment}>
                    <h2 className={styles['section-title']}>Payment</h2>
                    <RadioList list={[
                            {id:'upon-receipt',label:'Payment upon receipt of goods',value:'Payment upon receipt of goods'},
                            {id:'by-card',label:'Credit or Debit Card',value:'Credit or Debit Card'},
                            {id:'paypal',label:<img src={PayPalIcon} alt='PayPal' style={{width:'100px'}} />,value:'PayPal'},
                        ]}
                        groupName='payment'
                        callback={value=>console.log(value)}
                    >
                        <></>
                        <div className={styles['payment-option']}>
                            {
                                userInfo?.payment_methods&&<><div className={styles.list}>
                                        <MethodsList 
                                            methods={userInfo.payment_methods} 
                                            triger={false} 
                                            callback={value=>console.log(value)}
                                        />
                                    </div>
                                    <p
                                        className={styles.another}
                                        onClick={()=>setCardUse(p=>!p)}
                                    >Use Another Card</p>
                                    </>
                            }
                            <div className={`${styles['card-form']} ${cardUse?styles.active:''}`}>
                                <div className={styles["card-form__content"]}>
                                    <CreditCardFrom cardData={cardData} callback={setCardData} />
                                </div>
                            </div>
                        </div>
                        <></>
                    </RadioList>
                </div>
                <div className={styles["button-bar"]}>
                    <Button
                        mode='primary'
                        width='160px'
                        height='45px'
                    >Place Order</Button>
                </div>
            </div>
            <div className={styles.cart}>
                <h3 className={styles['cart__title']}>Order Summary</h3>
                <TotalSection/>
                <div className={styles.productList}>
                    <div className={styles.productList__edit}>
                        <Link to='/shopping-cart'>
                            <EditButton>Edit</EditButton>
                        </Link>
                    </div>
                    <OrdreSummaryList/>
                </div>
            </div>
        </div>
    </div>;
}
 
export default Checkout;