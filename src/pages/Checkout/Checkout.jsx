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
                    <div className={styles.customer}>
                        <h2 className={styles['section-title']}>Customer</h2>
                        <CheckoutCustomer firstName={firstName} lastName={lastName} email={email} phoneNumber={phoneNumber} />
                    </div>
                    <div className={styles.shipping}>
                        <h2 className={styles['section-title']}>Shipping</h2>
                        {/* <div className={styles.city} onClick={()=>setIsCityModalOpen(true)}>
                            <img className={styles.city__pointIcon} src={mapPoint} alt="Map point" />
                            <p className={styles.city__name}>
                                {
                                currentCity.id?<>
                                    Your city is<span className={styles.city__current}>{currentCity.name}</span>
                                </>:'Choose your city'
                                }
                            </p>
                            <button className={styles.city__arrow}>
                                <img src={rightArrow} alt="" />
                            </button>
                            
                        </div>
                        <ModalWindow isOpen={isCityModalOpen} closeHandler={closeModalWindowHandler} title='Choose your city'>
                            <CityForm currentCity={currentCity} setCity={setCurrentCity} closeHandler={closeModalWindowHandler}/>
                        </ModalWindow>
                        <RadioList 
                            list={[
                                {id:'opt1',label:'Pickup from Ukrposhta',value:'ukrposhta-prickup',disabled:validRadio},
                                {id:'opt2',label:'Courier Ukrposhta',value:'ukrposhta-courier',disabled:validRadio},
                                {id:'opt3',label:'Pickup from Nova Poshta',value:'novaposhta-prickup',disabled:validRadio},
                                {id:'opt4',label:'Courier Nova Poshta',value:'novaposhta-courier',disabled:validRadio},
                            ]}
                            groupName='shipping'
                        >
                            <div className={styles['option-wrapper']} >
                                <Select placeholder='Select a post office'
                                params={ukrposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                                getData={hadler}
                                type='borderType'
                                height='50px'
                                />
                            </div>
                            <div className={styles['option-wrapper']} >
                                <CustomerAddressForm />
                            </div>
                            <div className={styles['option-wrapper']} >
                                <Select placeholder='Select a post office'
                                params={novaposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                                getData={hadler}
                                type='borderType'
                                height='50px'
                                />
                            </div>
                            <div className={styles['option-wrapper']}>
                                <CustomerAddressForm />
                            </div>
                        </RadioList> */}
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