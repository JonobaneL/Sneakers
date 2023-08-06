import React, { useEffect, useRef, useState } from 'react';
import styles from './UserInfoSettings.module.scss'
import { useAuth } from '../../context/AuthContext'
import { getUser} from '../../fireAuthAPI';
import {updateUserCity, updateUserPhone } from '../../firebase/userFirebaseAPI'
import CInput from '../UI/input/CInput';
import Button from '../UI/button/Button';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { findLocation } from '../../utils/searchLocation';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

const UserInfoSettings = () => {
    const {currentUser, updateUserEmail, updateUserPassword} = useAuth();
    const userInfo = getUser(currentUser.uid);
    const emailRef = useRef();
    const windowSize = window.screen.availWidth<425?true:false;
    const phoneNumber = useInput(userInfo.phone||'',{minLength:12},{minLength:"Please enter your number"})
    const password = useInput('',{minLength:6},{minLength:"Password must has at least 6 characters"});
    const confirmPassword = useInput('',{minLength:6,isMatch:password.value},{minLength:"Password must has at least 6 characters",isMatch:`Passwords don't match`});
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo.city){
            setCity(userInfo.city)
        }
        if(userInfo.phone){
            const number = formatPhoneNumber(userInfo.phone)
            phoneNumber.setValue(number)
        }
    },[userInfo])
    const locationResponse = findLocation(city)
    const applyHandler = ()=>{
        const promises = [];
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if(phoneNumber.value !== formatPhoneNumber(userInfo.phone)){
            promises.push(updateUserPhone({uid:currentUser.uid,phone:phoneNumber.value}))
        }
        if(city !== userInfo.city){
            promises.push(updateUserCity({uid:currentUser.uid,city:city}))
        }
        
        if(confirmPassword.currentErrors.length===0){
            promises.push(updateUserPassword(confirmPassword.value))
        }
        Promise.all(promises).then(()=>navigate('/user-profile/info'))
        .catch(err=>console.log(err))
    }
    return (
        <div className={styles['info-settings']}>
             <ul className={styles.info}>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Email:
                    </div>
                    <div className={styles.input}>
                        <CInput 
                            ref={emailRef} 
                            height={`${windowSize?'40':'50'}`}
                            mode='fullBorder' 
                            defaultValue={currentUser.email}  
                        />
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Phone:
                    </div>
                    <div className={styles.input}>
                        <CInput 
                            height={`${windowSize?'40':'50'}`}
                            mode='fullBorder' 
                            value={phoneNumber.value}
                            onChange={(e)=>{
                                const number = formatPhoneNumber(e.target.value)
                                phoneNumber.setValue(number)
                            }}  
                            onBlur={ e => phoneNumber.onBlur(e)}
                            valid={phoneNumber.isDurty && phoneNumber.currentErrors.length>0}
                        />
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        City:
                    </div>
                    <div className={styles.input}>
                        <Autocomplete data={locationResponse} query={city} setQuery={setCity}>
                            <CInput 
                                mode='fullBorder' 
                                height={`${windowSize?'40':'50'}`}
                                value={city} 
                                onChange={e=>setCity(e.target.value)} 
                            />
                        </Autocomplete> 
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Password:
                    </div>
                    <div className={styles.input}>
                        <ValidationErrorMessages durty={password.isDurty} errorMessages={password.currentErrors}>
                            <CInput 
                                mode='fullBorder' 
                                value={password.value} 
                                placeholder="Leave blank to keep the same"
                                onChange={ e => password.onChange(e)}
                                onBlur={ e => password.onBlur(e)}
                                height={`${windowSize?'40':'50'}`}
                                valid={password.isDurty && password.currentErrors.length>0}
                            />
                        </ValidationErrorMessages>
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Confirm Password:
                    </div>
                    <div className={styles.input}>
                        <ValidationErrorMessages durty={confirmPassword.isDurty} errorMessages={confirmPassword.currentErrors}>
                            <CInput 
                                mode='fullBorder' 
                                value={confirmPassword.value}  
                                placeholder="Leave blank to keep the same"
                                onChange={e=>confirmPassword.onChange(e)}
                                onBlur={e=>confirmPassword.onBlur(e)}
                                height={`${windowSize?'40':'50'}`}
                                valid={confirmPassword.isDurty && confirmPassword.currentErrors.length>0}
                            />
                        </ValidationErrorMessages>
                    </div>
                </li>
            </ul>
            <div className={styles.warning}>
                Don't change fields to keep the same
            </div>
            <div className={styles['button-bar']}>
                <Button 
                    mode='secondary' 
                    width={`${windowSize?'100%':'120px'}`}
                    onClick={()=>navigate('/user-profile/info')}
                >Cancel</Button>
                <Button 
                    mode='primary' 
                    width={`${windowSize?'100%':'120px'}`}
                    onClick={applyHandler}
                >Apply</Button>
            </div>
        </div>
    );
};

export default UserInfoSettings;