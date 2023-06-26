import { useEffect, useState } from 'react';
import styles from './Checkout.module.scss'
import RadioList from '../../components/RadioList/RadioList';
import { getPostOffice } from '../../utils/getPostOffice';
import PayPalIcon from '../../images/PayPal-icon.svg'
import CreditCardFrom from '../../components/CreditCardForm/CreditCardFrom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import editIcon from '../../images/edit-icon.svg'
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import CheckoutCustomer from '../../components/CheckoutCustomer/CheckoutCustomer';
import CheckoutShipping from '../../components/CheckoutShipping/CheckoutShipping';
import Accrodion from '../../components/UI/accordion/Accordion';

const Checkout = () => {
    const [currentCity,setCurrentCity] = useState({})
    const hadler = (param)=>{
        console.log(param)
    }
    const firstName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const lastName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:'Please enter a valid email address',isEmail:'Please enter a valid email address'})
    const phoneNumber = useInput('',{isEmpty:true},{isEmpty:'Please enter your phone number'})
    
    return <div className={styles.checkout}>
        <div className={styles.content}>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles["order-form"]}>
                    <div className={styles.bag}>
                        <Accrodion
                            header={<h2 className={styles['section-title']}>In your bag</h2>}
                            autoHeight={true}
                        >
                            <div className={styles.productList}>
                                <Link to='/shopping-cart'>
                                    <div className={styles.productList__edit}>
                                        <img src={editIcon} alt="Edit cart" />
                                        Edit
                                    </div>
                                </Link>
                                <OrdreSummaryList/>
                            </div>
                            <TotalSection borders={false}/>

                        </Accrodion>
                    </div>
                    <div className={styles.customer}>
                        <h2 className={styles['section-title']}>Customer</h2>
                        <CheckoutCustomer firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} />
                    </div>
                    <div className={styles.shipping}>
                        <h2 className={styles['section-title']}>Shipping</h2>
                        <CheckoutShipping />
                    </div>
                    <div className={styles.payment}>
                        <h2 className={styles['section-title']}>Payment</h2>
                        <RadioList list={[
                                {id:'upon-receipt',label:'Payment upon receipt of goods',value:'upon-receipt'},
                                {id:'by-card',label:'Credit or Debit Card',value:'by-card'},
                                {id:'paypal',label:<img src={PayPalIcon} alt='PayPal' style={{width:'100px'}} />,value:'paypal'},
                            ]}
                            groupName='payment'
                        >
                            <></>
                            <div className={styles['option-wrapper']}>
                                <CreditCardFrom />
                            </div>
                            <></>
                        </RadioList>
                    </div>
            </div>
            <div className={styles.cart}>
                <h3 className={styles['cart__title']}>Order Summary</h3>
                <TotalSection/>
                <div className={styles.productList}>
                    <Link to='/shopping-cart'>
                        <div className={styles.productList__edit}>
                            <img src={editIcon} alt="Edit cart" />
                            Edit
                        </div>
                    </Link>
                    <OrdreSummaryList/>
                </div>
            </div>
        </div>
    </div>;
}
 
export default Checkout;