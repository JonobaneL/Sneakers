import { useState } from 'react';
import styles from './Checkout.module.scss'
import InfoTabs from '../../components/UI/info-tabs/InfoTabs';
import { useShoppingCart } from '../../context/CartContext';
import { useEffect } from 'react';
import RadioList from '../../components/RadioList/RadioList';
import Select from '../../components/UI/select/Select';
import { city } from '../../data/shipping-data';
import { getPostOffice } from '../../utils/getPostOffice';
import CustomerAddressForm from '../../components/CustomerAddress/CustomerAddressForm';
import PayPalIcon from '../../images/PayPal-icon.svg'
import CInput from '../../components/UI/inputV2/CInput';
import CreditCardFrom from '../../components/CreditCardForm/CreditCardFrom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import editIcon from '../../images/edit-icon.svg'
import { Link } from 'react-router-dom';

const Checkout = () => {
    const [customer,setCustomer] = useState('new');
    const {cartSubTotal,cartTotal} = useShoppingCart();
    const hadler = (param)=>{
        console.log(param)
    }
    const currentCity = city[city.length-1]
    console.log(currentCity)
    const ukrposhtaOffices = getPostOffice(currentCity.id,'ukrposhta')
    const novaposhtaOffices = getPostOffice(currentCity.id,'novaposhta')
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
                                        <input className={styles.customInput} type="text" placeholder='First name*' />
                                        <input className={styles.customInput} type="text" placeholder='Last name*' />
                                    </div>
                                    <div className={styles['customer-contacts']}>
                                        <input className={styles.customInput} type="text" placeholder='Email*' />
                                        <input className={styles.customInput} type="tel" placeholder='Phone number*' />
                                    </div>
                                </div>
                            <div>
                            
                            </div>
                        </InfoTabs>

                    </div>
                    <div className={styles.shipping}>
                        <h2 className={styles['section-title']}>Shipping</h2>
                        <div className="city"></div>
                        <RadioList list={[
                            {id:'opt1',label:'Pickup from Ukrposhta',value:'ukrposhta-prickup'},
                            {id:'opt2',label:'Courier Ukrposhta',value:'ukrposhta-courier'},
                            {id:'opt3',label:'Pickup from Nova Poshta',value:'novaposhta-prickup'},
                            {id:'opt4',label:'Courier Nova Poshta',value:'novaposhta-courier'},
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