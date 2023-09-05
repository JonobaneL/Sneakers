import React from 'react';
import styles from './UserOrders.module.scss'
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../../firebase/ordersFirebaseAPI';
import Loader from '../UI/loader/Loader';
import rightArrow from '../../images/right-arrow.svg'
import { groupByObject } from '../../utils/objectSort';

const UserOrders = () => {
    const {currentUser} = useAuth()
    const [isLoading,,userOrders] = useAsync(()=>getUserOrders(currentUser.uid),[],'firebase')
    console.log(userOrders)
    const orderDate = Date.now()
    console.log(orderDate)
    if(!isLoading){
        groupByObject(userOrders)
    }

    return (
        <div className={styles.orders}>
            <div className={styles["list-header"]}>
                <p>Order Number</p>
                <p>Status</p>
                <p>Total</p>
                <p>Date</p>
            </div>
            <p className={styles.month}>September 2023</p>
            {
                isLoading?
                <div className={styles.wrapper}>
                    <Loader/>
                </div>
                :<ul className={styles['orders-list']}>
                    {
                        userOrders.map(item=>{
                            return <li key={item.orderID} className={styles.order}>
                                <p>{item.orderID}</p>
                                <p className={styles.order__status}>{item.status}</p>
                                <p>${item.userCart.cartTotal}</p>
                                <p>{item.date}</p>
                                <img className={styles.arrow} src={rightArrow} alt="arrow" />
                            </li>
                        })
                    }
                </ul>
            }
            {/* <p className={styles.month}>August 2023</p>
            <ul className={styles['orders-list']}>
                    {
                        userOrders.map(item=>{
                            return <li key={item.orderID} className={styles.order}>
                                <p>{item.orderID}</p>
                                <p>{item.status}</p>
                                <p>${item.userCart.cartTotal}</p>
                                <p>{item.date}</p>
                            </li>
                        })
                    }
                </ul> */}
        </div>
    );
};


export default UserOrders;