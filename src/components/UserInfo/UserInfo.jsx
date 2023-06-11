import React from 'react';
import styles from './UserInfo.module.scss'
import { getUser } from '../../fireCloudAPI';
import { useAuth } from '../../context/AuthContext';
import editIcon from '../../images/edit-icon.svg'

const UserInfo = () => {
    const { currentUser } = useAuth();
    const userInfo = getUser(currentUser.uid);
    const paymentMethods = [];
    const deliveryAddresses = [];

    return (
        <div className={styles['user-info']}>
             <div className={styles['edit-section']}>
                <button className={styles.edit}>
                    <img src={editIcon} alt="Edit cart" />
                    Edit
                </button>
            </div>
            <ul className={styles.info}>
                <li>
                    <div className={styles['field-name']}>
                        Full Name:
                    </div> 
                    {userInfo.firstName} {userInfo.lastName}
                </li>
                <li>
                    <div className={styles['field-name']}>
                        Email:
                    </div> 
                    {currentUser.email}
                </li>
                <li>
                    <div className={styles['field-name']}>
                        Phone:
                    </div> 
                    {userInfo.phone||'none'}
                </li>
                <li>
                    <div className={styles['field-name']}>
                        City:
                    </div> 
                    {userInfo.city}
                </li>
            </ul>
           
            <div className={styles["payment-methods"]}>
                <div className={styles.title}>
                    <h3>Payment Methods</h3>
                    <button className={styles['add-btn']}>Add</button>
                </div>
                {
                    paymentMethods.length
                    ?<ul>
                        {paymentMethods.map(item=><li>
                            {item}
                        </li>)}
                    </ul>
                    :<div className={styles.notice}>
                        <p>You currently don’t have any saved payment methods. Add a method here to be prefilled for quicker checkout.</p>
                    </div>
                }
            </div>
            <div className={styles["delivery-addresses"]}>
                <div className={styles.title}>
                    <h3 >Delivery Addresses</h3>
                    <button className={styles['add-btn']}>Add</button>
                </div>
                {
                    deliveryAddresses.length
                    ?<ul>
                        {deliveryAddresses.map(item=><li>
                            {item}
                        </li>)}
                    </ul>
                    :<div className={styles.notice}>
                        <p>You currently don’t have any saved delivery addresses. Add a address here to be prefilled for quicker checkout.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserInfo;