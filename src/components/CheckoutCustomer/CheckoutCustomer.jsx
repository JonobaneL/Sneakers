import React, { memo, useState, useEffect } from 'react';
import styles from './CheckoutCustomer.module.scss'
import CInput from '../UI/input/CInput';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import InfoTabs from '../UI/info-tabs/InfoTabs';
import { useAuth } from '../../context/AuthContext';
import LogInForm from '../LogInForm/LogInForm'
import { getCurrentUser } from '../../fireAuthAPI';
import Loader from '../UI/loader/Loader';

const CheckoutCustomer = memo(({firstName,lastName,email,phoneNumber}) => {
    const {currentUser} = useAuth();
    const [activeTab,setActiveTab] = useState(currentUser?1:0)
    const [isLoading,setIsLoading] = useState(false)
    const tabsTitles = [`I'm a new customer`,`I'm a regular customer`]
    const getUser = async(id)=>{
        try{
            setIsLoading(true)
            const response = await getCurrentUser(id);
            firstName.setValue(response.data().firstName)
            lastName.setValue(response.data().lastName)
            email.setValue(currentUser.email)
            phoneNumber.setValue(response.data().phoneNumber || '')
            setIsLoading(false)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(currentUser){
            getUser(currentUser.uid)
            setActiveTab(1)
        }else{
            setActiveTab(0)
        }

    },[currentUser])
    const handleSubmit = ()=>{};
    return (
        <div className={styles.customer}>
            <InfoTabs titles={tabsTitles} initial={activeTab} disabled={[activeTab-1]}>
                <div className={styles['customer-form']}>
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
                    :isLoading?<div className={styles.loader}>
                        <Loader/>
                        </div>
                    :<div className={styles['customer-form']}>
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