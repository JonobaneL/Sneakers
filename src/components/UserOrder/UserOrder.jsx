import React from 'react';
import styles from './UserOrder.module.scss'
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { getOrder } from '../../firebase/ordersFirebaseAPI';
import TotalSection from '../TotalSection/TotalSection';
import Loader from '../UI/loader/Loader';
import OrdreSummaryList from '../OrderSummaryList/OrderSummaryList';

const UserOrder = () => {
    const {orderID} = useParams();
    const [isLoading,,orderInfo] = useAsync(()=>getOrder(orderID),[],'firebase')
    
    return (
        <div className={styles['order-info']}>
            <div className={styles.back}>
                <Link to='/user-profile/orders'><span className={styles.back__icon}>&#65513;</span>Back to Orders</Link>
            </div>
            {
                isLoading
                ?<div className={styles.loader}><Loader/></div>
                :<>
                    <div className={styles['header-info']}>
                        <p>Status: {orderInfo.status}</p>
                        <p>Date: {orderInfo.date}</p>
                    </div>
                    <div className={styles['order-details']}>
                        <div className={styles.column}>
                            <h3 className={styles["details-title"]}>
                                Order {orderInfo.id}
                            </h3>
                            <div className={styles.shipping}>
                                <h3>Shipping</h3>
                                <p>{orderInfo.shipping.company}</p>
                                {
                                orderInfo.shipping?.address?
                                    <p>{orderInfo.shipping.address}, {orderInfo.shipping.appartment}</p>
                                :<p>{orderInfo.shipping?.postOffice}</p>
                                }
                                <p>{orderInfo.city}</p>
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
                        <div className={styles.column}>
                            <h3 className={styles["details-title"]}>Items</h3>
                            <div className={styles.column__wrapper}>
                                <OrdreSummaryList cart={orderInfo.userCart.shoppingCart}/>
                            </div>
                        </div>
                    </div>
                    <TotalSection
                        total={orderInfo.userCart.cartTotal}
                        subTotal={orderInfo.userCart.cartSubTotal}
                        discount={orderInfo.userCart.cartDisocount}
                    />
                </>
            }
           
        </div>
    );
};

export default UserOrder;