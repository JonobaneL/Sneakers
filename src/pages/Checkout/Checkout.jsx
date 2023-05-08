import { useState } from 'react';
import styles from './Checkout.module.scss'
import InfoTabs from '../../components/UI/info-tabs/InfoTabs';
import { useShoppingCart } from '../../context/CartContext';
import RadioButton from '../../components/UI/radioButton/RadioButton';
import CartItem from '../../components/CartItem/CartItem';
import { useShoes } from '../../hooks/useShoes';
import Accordion from '../../components/UI/accordionV2/Accordion';

const Checkout = () => {
    const [customer,setCustomer] = useState('new');
    const {shoppingCart} = useShoppingCart();
    console.log("Cart = ",shoppingCart)
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
                    <div className={styles["shipping-options"]}>
                        <label className={styles["shipping-options__item"]}>
                            <RadioButton name="shipping" id="opt1"/>
                            Pickup from Ukrposhta
                        </label>
                        <label className={styles["shipping-options__item"]}>
                            <RadioButton name="shipping" id="opt2"/>
                            Courier Ukrposhta
                        </label>
                        <label className={styles["shipping-options__item"]}>
                            <RadioButton name="shipping" id="opt3"/>
                            Pickup from Nova Poshta
                        </label>
                        <label className={styles["shipping-options__item"]}>
                            <RadioButton name="shipping" id="opt4"/>
                            Courier Nova Poshta
                        </label>
                    </div>
                </div>
                <div className={styles.payment}>
                    <h2 className={styles['section-title']}>Payment</h2>
                    <Accordion 
                        head={<label className={styles["shipping-options__item"]}>
                        <RadioButton name="shipping" id="opt1"/>
                        Pickup from Ukrposhta
                    </label>}
                    >
                        <p>Test</p>
                    </Accordion>
                </div>
            </form>
        </div>
        <div className={styles.cart}>
            <h3 className={styles['cart-title']}>Order Summary</h3>
        </div>
        </div>
    </div>;
}
 
export default Checkout;