import React from 'react';
import styles from './OrderInfo.module.scss';
import Button from '../../components/UI/button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import OrdreSummaryList from '../../components/OrderSummaryList/OrderSummaryList';
import TotalSection from '../../components/TotalSection/TotalSection';
import { useAsync } from '../../hooks/useAsync';
import { getOrder } from '../../firebase/ordersFirebaseAPI';

const OrderInfo = () => {
    const navigate = useNavigate()
    const {orderID} = useParams();
    const [isLoading,,orderInfo] = useAsync(()=>getOrder(orderID),[],'firebase')
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
                            We are getting started on your order right away, and you will recive an order confirmation email to <span className={styles.message__email}>{orderInfo.email}</span>. In the meantime, explore the latest fashion and get inspired by new trends.
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
                    {
                        !isLoading?<div className={styles['order-details']}>
                        <div className={styles.column}>
                            <div className={styles.column__wrapper}>
                                <OrdreSummaryList cart={orderInfo.userCart.shoppingCart}/>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <h2 className={styles["details-title"]}>
                                My Order {orderInfo.id}
                            </h2>
                            <div className={styles.shipping}>
                                <h3>Shipping</h3>
                                <p>{orderInfo.shipping.company}</p>
                                {
                                orderInfo.shipping?.address?
                                    <p>{orderInfo.shipping.address}, {orderInfo.shipping.appartment}</p>
                                :<p>{orderInfo.shipping?.postOffice}</p>
                                }
                            </div>
                            <div className={styles.payment}>
                                <h3>Payment</h3>
                                <p>{orderInfo.paymentMethod}</p>
                                {
                                    orderInfo.card.cartNumber&&<div className={styles.card}>
                                           <p>{orderInfo.card.cartNumber.match(/.{0,4}/g)?.join(' ')}</p>
                                           <p>{orderInfo.card.date}</p>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className={styles.summary}>
                            <TotalSection
                                total={orderInfo.userCart.cartTotal}
                                subTotal={orderInfo.userCart.cartSubTotal}
                                discount={orderInfo.userCart.cartDisocount}
                            />
                        </div>
                    </div>
                    :null
                    }
                    
                    
                </div>
            </div>
            
        </div>
    );
};

export default OrderInfo;