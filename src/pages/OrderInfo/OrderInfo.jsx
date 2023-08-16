import React from 'react';
import styles from './OrderInfo.module.scss';
import Button from '../../components/UI/button/Button';
import { useNavigate } from 'react-router-dom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import { useSelector } from 'react-redux';
import TotalSection from '../../components/TotalSection/TotalSection';
const order = {
    card:{methodID: 'method1691579698519', cartNumber: '8798237598743985', cvv: '324', date: '12/26'},
    email:"fedun.andri@mail.com",
    firstName: "Andriy",
    lastName: "Fedun",
    paymentMethod: "Credit or Debit Card",
    phoneNumber: "098 1234 454",
    shipping:{company: 'Ukr Poshta', appartment:7, address: 'Богдана Хмельницького 3', addressID: 'address1690821178624'},
}
const OrderInfo = () => {
    const navigate = useNavigate()
    const cart = useSelector(state=>state.cartReducer)
    console.log(cart)
    return (
        <div className={styles['order-info']}>
            <div className={styles.title}>
                <h1>Order confirmed!</h1>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <div className={styles.message}>
                        <h2 className={styles.message__title}>Thank you!</h2>
                        <p className={styles.message__content}>
                            We are getting started on your order right away, and you will recive an order confirmation email to <span className={styles.message__email}>{order.email}</span>. In the meantime, explore the latest fashion and get inspired by new trends.
                        </p>
                        <div className={styles.message__button}>
                            <Button
                                width='100%'
                                height='45px'
                                mode='primary'
                                onClick={()=>navigate('/')}
                            >Continue Shopping</Button>
                        </div>
                    </div>
                    <div className={styles['order-details']}>
                        <div className={styles.column}>
                            <div className={styles.column__wrapper}>
                                <OrdreSummaryList/>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <h2 className={styles["details-title"]}>
                                My Order #U{Date.now()}
                            </h2>
                            <div className={styles.shipping}>
                                <h3>Shipping</h3>
                                <p>{order.shipping.company}</p>
                                {
                                order.shipping?.address?
                                    <p>{order.shipping.address}, {order.shipping.appartment}</p>
                                :<p>{order.shipping?.postOffice}</p>
                                }
                            </div>
                            <div className={styles.payment}>
                                <h3>Payment</h3>
                                <p>{order.paymentMethod}</p>
                                {
                                    order.card.cartNumber&&<div className={styles.card}>
                                           <p>{order.card.cartNumber.match(/.{0,4}/g)?.join(' ')}</p>
                                           <p>{order.card.date}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className={styles.summary}>
                            <TotalSection/>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default OrderInfo;