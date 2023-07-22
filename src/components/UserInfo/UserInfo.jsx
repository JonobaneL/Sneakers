import React, { useState } from 'react';
import styles from './UserInfo.module.scss'
import { getUser } from '../../fireAuthAPI';
import { useAuth } from '../../context/AuthContext';
import EditButton from '../UI/editButton/EditButton';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import UserInfoSettings from '../UserInfoSettings/UserInfoSettings'


const UserInfo = () => {
    const { currentUser } = useAuth();
    const userInfo = getUser(currentUser.uid);
    const paymentMethods = [];
    const deliveryAddresses = [];
    const navigate = useNavigate();
    const [isModalOpen,setIsOpen] = useState(false)
    return (
        <div className={styles['user-info']}>
             <div className={styles['edit-section']}>
                <EditButton onClick={()=>navigate('/user-profile/info-settings')}>Edit</EditButton>
                <ModalWindow isOpen={isModalOpen} closeHandler={()=>setIsOpen(false)} title='Settings'>
                    <UserInfoSettings />
                </ModalWindow>
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
                    <EditButton>
                        <p className={styles['btn-content']}>Add</p>
                    </EditButton>
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
                    <EditButton>
                        <p className={styles['btn-content']}>Add</p>
                    </EditButton>
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