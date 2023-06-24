import React, { memo, useState,useLayoutEffect, useEffect } from 'react';
import styles from './CheckoutCustomer.module.scss'
import CInput from '../UI/input/CInput';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import InfoTabs from '../UI/info-tabs/InfoTabs';
import { useAuth } from '../../context/AuthContext';
import LogInForm from '../LogInForm/LogInForm'
import { getUser } from '../../fireCloudAPI';

const CheckoutCustomer = memo(({firstName,lastName,email,phoneNumber}) => {
    const {currentUser} = useAuth();
    // const userInfo = getUser(currentUser?.uid?currentUser.uid:'1');
    // console.log(userInfo)
    const [tabsTitles,setTabTitles] = useState([])
    // const getUser = 
    useEffect(()=>{
        if(currentUser){
            setTabTitles([{
                id:'1',
                name:`I'm a regular customer`
            }])
            console.log(userInfo)
            firstName.setValue(userInfo.firstName)
        }else{
            setTabTitles([
                {
                    id:'1',
                    name:`I'm a new buyer`
                },
                {
                    id:'2',
                    name:`I'm a regular customer`
                }
            ])
        }

    },[currentUser])
    const handleSubmit = ()=>{
        // firstName.setValue(userInfo.firstName)
        // setTabTitles([
        //     {
        //         id:'1',
        //         name:`I'm a regular customer`
        //     }
        // ])
    }
    return (
        <div className={styles.customer}>
            <InfoTabs titles={tabsTitles}>
                <div className={styles['new-customer']}>
                    <div className={styles['customer-info']}>
                            <ValidationErrorMessages durty={firstName.isDurty} errorMessages={firstName.currentErrors}>
                                <CInput 
                                    value={firstName.value} 
                                    onChange={e=>firstName.onChange(e)} 
                                    onBlur={e=>firstName.onBlur(e)} 
                                    mode='fullBorder' 
                                    height='50' 
                                    placeholder='First name*' 
                                    type='text' 
                                    valid={firstName.isValid==false && firstName.isDurty}
                                />
                            </ValidationErrorMessages>
                            <ValidationErrorMessages durty={lastName.isDurty} errorMessages={lastName.currentErrors}>
                                <CInput 
                                    value={lastName.value} 
                                    onChange={e=>lastName.onChange(e)} 
                                    onBlur={e=>lastName.onBlur(e)} 
                                    placeholder='Last name*' 
                                    mode='fullBorder'
                                    height={50}
                                    type='text' 
                                    valid={lastName.isValid==false && lastName.isDurty}
                                />
                            </ValidationErrorMessages>
                    </div>
                    <div className={styles['customer-contacts']}>
                        <ValidationErrorMessages durty={email.isDurty} errorMessages={email.currentErrors}>
                            <CInput 
                                value={email.value} 
                                onChange={e=>email.onChange(e)} 
                                onBlur={e=>email.onBlur(e)} 
                                placeholder='Email*' 
                                type='email' 
                                mode='fullBorder'
                                height={50}
                                valid={email.isValid==false && email.isDurty}/>
                        </ValidationErrorMessages>
                        <ValidationErrorMessages durty={phoneNumber.isDurty} errorMessages={phoneNumber.currentErrors}>
                            <CInput 
                                value={phoneNumber.value} 
                                onChange={e=>phoneNumber.onChange(e)} 
                                onBlur={e=>phoneNumber.onBlur(e)} 
                                placeholder='Phone number*' 
                                type='tel' 
                                mode='fullBorder'
                                height={50} 
                                valid={phoneNumber.isValid==false && phoneNumber.isDurty}/>
                        </ValidationErrorMessages>
                    </div>
                </div>

                {
                    !currentUser?<div className={styles['log-in-customer']}>
                        <LogInForm callback={handleSubmit} />
                    </div>
                    :<div className={styles['new-customer']}>
                    <div className={styles['customer-info']}>
                            <ValidationErrorMessages durty={firstName.isDurty} errorMessages={firstName.currentErrors}>
                                <CInput 
                                    value={firstName.value} 
                                    onChange={e=>firstName.onChange(e)} 
                                    onBlur={e=>firstName.onBlur(e)} 
                                    mode='fullBorder' 
                                    height='50' 
                                    placeholder='First name*' 
                                    type='text' 
                                    valid={firstName.isValid==false && firstName.isDurty}
                                />
                            </ValidationErrorMessages>
                            <ValidationErrorMessages durty={lastName.isDurty} errorMessages={lastName.currentErrors}>
                                <CInput 
                                    value={lastName.value} 
                                    onChange={e=>lastName.onChange(e)} 
                                    onBlur={e=>lastName.onBlur(e)} 
                                    placeholder='Last name*' 
                                    mode='fullBorder'
                                    height={50}
                                    type='text' 
                                    valid={lastName.isValid==false && lastName.isDurty}
                                />
                            </ValidationErrorMessages>
                    </div>
                    <div className={styles['customer-contacts']}>
                        <ValidationErrorMessages durty={email.isDurty} errorMessages={email.currentErrors}>
                            <CInput 
                                value={email.value} 
                                onChange={e=>email.onChange(e)} 
                                onBlur={e=>email.onBlur(e)} 
                                placeholder='Email*' 
                                type='email' 
                                mode='fullBorder'
                                height={50}
                                valid={email.isValid==false && email.isDurty}/>
                        </ValidationErrorMessages>
                        <ValidationErrorMessages durty={phoneNumber.isDurty} errorMessages={phoneNumber.currentErrors}>
                            <CInput 
                                value={phoneNumber.value} 
                                onChange={e=>phoneNumber.onChange(e)} 
                                onBlur={e=>phoneNumber.onBlur(e)} 
                                placeholder='Phone number*' 
                                type='tel' 
                                mode='fullBorder'
                                height={50} 
                                valid={phoneNumber.isValid==false && phoneNumber.isDurty}/>
                        </ValidationErrorMessages>
                    </div>
                </div>
                }
                
            </InfoTabs>
        </div>
    );
});

export default CheckoutCustomer;