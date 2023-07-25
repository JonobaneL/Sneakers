import React, { useState } from 'react';
import styles from './UserInfo.module.scss'
import { getCurrentUser } from '../../fireAuthAPI';
import { useAuth } from '../../context/AuthContext';
import EditButton from '../UI/editButton/EditButton';
import { useNavigate } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import PaymentMethods from '../PaymentMethods/PaymentMethods';
import { useAsync } from '../../hooks/useAsync';
import Loader from '../UI/loader/Loader'
import MethodsList from '../MedhodsList/MethodsList';


const UserInfo = () => {
    const { currentUser } = useAuth();
    const [formTriger,setFormTriger] = useState(false)
    const [isLoading,,userInfo] = useAsync(()=>getCurrentUser(currentUser.uid),[formTriger],'firebase')
    const [paymentModal,setPaymentModal] = useState(false);
    const [addressModal,setAddressModal] = useState(false);
    const deliveryAddresses = [];
    const navigate = useNavigate();
   
    return (
        <div className={styles['user-info']}>
             <div className={styles['edit-section']}>
                <EditButton onClick={()=>navigate('/user-profile/info-settings')}>Edit</EditButton>
                
            </div>
            <ul className={styles.info}>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Full Name:
                    </div> 
                    {userInfo.firstName} {userInfo.lastName}
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Email:
                    </div> 
                    {currentUser.email}
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Phone:
                    </div> 
                    {userInfo.phone||'none'}
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        City:
                    </div> 
                    {userInfo.city}
                </li>
            </ul>
           
            <div className={styles["payment-methods"]}>
                <div className={styles.title}>
                    <h3>Payment Methods</h3>
                    <EditButton onClick={()=>setPaymentModal(true)}>Add</EditButton>
                    <ModalWindow isOpen={paymentModal} closeHandler={()=>setPaymentModal(false)} title='Add Payment Method'>
                        <PaymentMethods userID={currentUser.uid} closeHandler={()=>setPaymentModal(false)} triger={()=>setFormTriger(p=>!p)}/>
                    </ModalWindow>
                </div>
                {
                    isLoading?<div className={styles.loading}><Loader /></div>
                    :<MethodsList methods={userInfo.payment_methods} userId={currentUser.uid} triger={()=>setFormTriger(p=>!p)} />
                }
            </div>
            
            <div className={styles["delivery-addresses"]}>
                <div className={styles.title}>
                    <h3 >Delivery Addresses</h3>
                    <EditButton>
                        <p className={styles['btn-content']}>Add</p>
                    </EditButton>
                    <ModalWindow isOpen={addressModal} closeHandler={()=>setAddressModal(false)} title='Add Delivery Address'>
                        
                    </ModalWindow>
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