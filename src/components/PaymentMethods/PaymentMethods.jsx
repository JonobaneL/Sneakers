import React, { useRef } from 'react';
import styles from './PaymentMethods.module.scss'
import CInput from '../UI/input/CInput';
import Button from '../UI/button/Button';
import { useInput } from '../../hooks/useInput';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import { addPaymentMethod } from '../../firebase/userFirebaseAPI';

const PaymentMethods = ({userID,closeHandler,triger}) => {
    const cartNumber = useInput('',{isEmpty:true,minLength:16},{isEmpty:'Please enter card number.',minLength:'Please enter card number.'})
    const date = useInput('',{isEmpty:true,minLength:5},{isEmpty:'Please enter card number.',minLength:'Please enter card number.'})
    const cvvNumber = useInput('',{isEmpty:true,minLength:3},{isEmpty:'Please enter card number.',minLength:'Please enter card number.'})
    const normilzeCardNumber = (value)=>{
        const card = value.replace(/\s/g,'').match(/.{0,4}/g)?.join(' ').substring(0,19)|| ''
        cartNumber.setValue(card.replace(/\s/g,''));
        return card;
    }
    const normilizeDate = (value)=>{
        const nValue = value.replace(/\s/g,'').match(/(\d{1,2})/g)?.join('/').substring(0,5) || '';
        date.setValue(nValue);
        return nValue;
    }
    const saveHandler = async()=>{
        try{
            await addPaymentMethod({
                uid:userID,
                method:{
                    methodID: `method${Date.now()}`,
                    cartNumber:cartNumber.value,
                    date:date.value,
                    cvv:cvvNumber.value,
                }
            })
            closeHandler();
            triger();
        }catch(err){
            console.log(err.message)
        }
    }
    const isFormValid = (params)=>{
        return params.includes(false)?true:false;
    }
    return (
        <div className={styles['payment-methods']}>
            <ValidationErrorMessages durty={cartNumber.isDurty} errorMessages={cartNumber.currentErrors}>
                <CInput 
                    mode='fullBorder'
                    height='50' 
                    placeholder='Cart Number'
                    maxLength="20"
                    onChange={e=>{
                        const {value} = e.target;
                        e.target.value = normilzeCardNumber(value)
                    }}
                    onBlur={e=>cartNumber.onBlur(e)}
                    valid={cartNumber.isDurty && cartNumber.currentErrors.length>0}
                />
            </ValidationErrorMessages>
            <ValidationErrorMessages durty={date.isDurty} errorMessages={date.currentErrors}>
                <CInput 
                    mode='fullBorder' 
                    height='50' 
                    placeholder='MM/YY'
                    maxLength="5"
                    onChange={e=>{
                        const {value} = e.target;
                        e.target.value = normilizeDate(value)
                    }}
                    onBlur={e=>date.onBlur(e)}
                    valid={date.isDurty && date.currentErrors.length>0}
                />
            </ValidationErrorMessages>

            <ValidationErrorMessages durty={cvvNumber.isDurty} errorMessages={cvvNumber.currentErrors}>
                <CInput 
                    mode='fullBorder' 
                    height='50' 
                    placeholder='CVV'
                    maxLength="3"
                    value={cvvNumber.value}
                    onChange={e=>cvvNumber.onChange(e)}
                    onBlur={e=>cvvNumber.onBlur(e)}
                    valid={cvvNumber.isDurty && cvvNumber.currentErrors.length>0}
                />
            </ValidationErrorMessages>

            <div className={styles["button-bar"]}>
                <Button 
                    mode='primary'
                    width='140px'
                    height='45px'
                    onClick={saveHandler}
                    disabled={isFormValid([cartNumber.isValid,date.isValid,cvvNumber.isValid])}
                >Save</Button>
            </div>
        </div>
    );
};

export default PaymentMethods;