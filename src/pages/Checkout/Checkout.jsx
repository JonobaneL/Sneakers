import { useState, useEffect } from 'react';
import styles from './Checkout.module.scss'
import InfoTabs from '../../components/UI/info-tabs/InfoTabs';
import RadioList from '../../components/RadioList/RadioList';
import Select from '../../components/UI/select/Select';
import { getPostOffice } from '../../utils/getPostOffice';
import CustomerAddressForm from '../../components/CustomerAddress/CustomerAddressForm';
import PayPalIcon from '../../images/PayPal-icon.svg'
import CInput from '../../components/UI/inputV2/CInput';
import CreditCardFrom from '../../components/CreditCardForm/CreditCardFrom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import editIcon from '../../images/edit-icon.svg'
import { Link } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import ValidationErrorMessages from '../../components/ValidationErrorMessages/ValidationErrorMessages';
import mapPoint from '../../images/map-pointer.svg'
import rightArrow from '../../images/right-arrow.svg'
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import CityForm from '../../components/CityForm/CityForm';

const Checkout = () => {
    const [customer,setCustomer] = useState('new');
    const [currentCity,setCurrentCity] = useState({})
    const hadler = (param)=>{
        console.log(param)
    }
    const firstName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const lastName = useInput('',{isEmpty:true},{isEmpty:'Please enter your first name'})
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:'Please enter a valid email address',isEmail:'Please enter a valid email address'})
    const phoneNumber = useInput('',{isEmpty:true},{isEmpty:'Please enter your phone number'})
    
    
    const ukrposhtaOffices = getPostOffice(currentCity.id,'ukrposhta')
    const novaposhtaOffices = getPostOffice(currentCity.id,'novaposhta')
    const [isCityModalOpen,setIsCityModalOpen] = useState(false);
    const validRadio = currentCity.id>0?false:true;
    const closeModalWindowHandler = ()=>{
        setIsCityModalOpen(false)
    }
    return <div className={styles.checkout}>
        <div className={styles.content}>
            <h1 className={styles.title}>Checkout</h1>
            <div className={styles["order-form"]}>
                <form>
                    <div className={styles.customer}>
                        <h2 className={styles['section-title']}>Customer</h2>
                        <InfoTabs titles={[{id:'1',name:`I'm a new buyer`},{id:'2',name:`I'm a regular customer`}]}>
                            <div className={styles.newCustomer}>
                                <div className={styles['customer-info']}>
                                        <ValidationErrorMessages durty={firstName.isDurty} errorMessages={firstName.currentErrors}>
                                            <CInput value={firstName.value} onChange={e=>firstName.onChange(e)} onBlur={e=>firstName.onBlur(e)} id='firstName-fullBorder-50' placeholder='First name*' type='text' data-errors={firstName.isValid==false && firstName.isDurty}/>
                                        </ValidationErrorMessages>
                                        <ValidationErrorMessages durty={lastName.isDurty} errorMessages={lastName.currentErrors}>
                                            <CInput value={lastName.value} onChange={e=>lastName.onChange(e)} onBlur={e=>lastName.onBlur(e)} id='lastName-fullBorder-50' placeholder='Last name*' type='text' data-errors={lastName.isValid==false && lastName.isDurty}/>
                                        </ValidationErrorMessages>
                                    </div>
                                    <div className={styles['customer-contacts']}>
                                        <ValidationErrorMessages durty={email.isDurty} errorMessages={email.currentErrors}>
                                            <CInput value={email.value} onChange={e=>email.onChange(e)} onBlur={e=>email.onBlur(e)} id='email-fullBorder-50' placeholder='Email*' type='email' name="email"  data-errors={email.isValid==false && email.isDurty}/>
                                        </ValidationErrorMessages>
                                        <ValidationErrorMessages durty={phoneNumber.isDurty} errorMessages={phoneNumber.currentErrors}>
                                            <CInput value={phoneNumber.value} onChange={e=>phoneNumber.onChange(e)} onBlur={e=>phoneNumber.onBlur(e)} id='phoneNumber-fullBorder-50' placeholder='Phone number*' type='tel'  data-errors={phoneNumber.isValid==false && phoneNumber.isDurty}/>
                                        </ValidationErrorMessages>
                                    </div>
                                </div>
                            <div>
                            
                            </div>
                        </InfoTabs>

                    </div>
                    <div className={styles.shipping}>
                        <h2 className={styles['section-title']}>Shipping</h2>
                        <div className={styles.city} onClick={()=>setIsCityModalOpen(true)}>
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
                        </RadioList>
                    </div>
                    <div className={styles.payment}>
                        <h2 className={styles['section-title']}>Payment</h2>
                    <RadioList list={[
                            {id:'opt1',label:'Payment upon receipt of goods',value:'upon-receipt'},
                            {id:'opt2',label:'Credit or Debit Card',value:'by-card'},
                            {id:'opt3',label:<img src={PayPalIcon} alt='PayPal' style={{width:'100px'}} />,value:'paypal'},
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
                </form>
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