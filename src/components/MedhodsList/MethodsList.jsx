import React from 'react';
import styles from './MethodsList.module.scss'
import closeIcon from '../../images/cancel.svg'
import { updatePaymentMethods } from '../../firebase/userFirebaseAPI';

const MethodsList = ({methods,userId,triger}) => {
    if(methods.length==0){
        return (
            <div className={styles.notice}>
                <p>You currently don’t have any saved payment methods. Add a method here to be prefilled for quicker checkout.</p>
            </div>
        )
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
            return <li key={index} className={styles.list__item}>
                <p className={styles.index}>{index+1}.</p>
                <p>{item.cartNumber.match(/.{0,4}/g)?.join(' ')}</p>
                <p>{item.date}</p>
                <span className={styles.cvv}>&#10033;&#10033;&#10033;</span>
                <button className={styles.delete} onClick={()=>deleteMethod(item.methodID)}>
                    <img src={closeIcon} alt="close" />
                </button>
            </li>})}
        </ul>
    );
};

export default MethodsList;