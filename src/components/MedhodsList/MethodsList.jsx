import React, { useState } from 'react';
import styles from './MethodsList.module.scss'
import closeIcon from '../../images/cancel.svg'
import { updatePaymentMethods } from '../../firebase/userFirebaseAPI';

const MethodsList = ({
    methods,
    userId='1',
    triger=()=>{},
    callback=()=>{}}) => {
    if(methods.length==0){
        return (
            <div className={styles.notice}>
                <p>You currently don’t have any saved payment methods. Add a method here to be prefilled for quicker checkout.</p>
            </div>
        )
    }
    const [activeMethod,setActiveMethod] = useState('');
    const methodHandler = (method)=>{
        if(activeMethod!==method.methodID){
            setActiveMethod(method.methodID);
            callback(method)
        }
    }
    const deleteMethod = async(methodID)=>{
        const filteredMethods = methods.filter(item=>item.methodID !== methodID);
        try{
            await updatePaymentMethods({
                uid:userId,
                methods:filteredMethods
            })
            triger()
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <ul className={styles['methods-list']}>
            {methods.map((item,index)=>{
            return <li 
                    key={index} 
                    className={`${styles.list__item} ${activeMethod==item.methodID?styles.active:''}`}
                    onClick={()=>{
                        if(!triger) methodHandler(item)
                    }}
                    >
                <p className={styles['cart-number']}>{item.cardNumber}</p>
                <p className={styles.date}>{item.date}</p>
                <span className={styles.cvv}>&#10033;&#10033;&#10033;</span>
                {
                    !triger
                    ?null
                    :<button className={styles.delete} onClick={()=>deleteMethod(item.methodID)}>
                        <img src={closeIcon} alt="close" />
                    </button>
                }
                
            </li>})}
        </ul>
    );
};

export default MethodsList;