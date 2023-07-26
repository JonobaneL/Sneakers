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

const UserInfoSettings = () => {
    const {currentUser, updateUserEmail, updateUserPassword} = useAuth();
    const userInfo = getUser(currentUser.uid);
    const emailRef = useRef();
    const phoneRef = useRef();
    
    const password = useInput('',{minLength:6},{minLength:"Password must has at least 6 characters"});
    const confirmPassword = useInput('',{minLength:6,isMatch:password.value},{minLength:"Password must has at least 6 characters",isMatch:`Passwords don't match`});
    const [city, setCity] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo.city){
            setCity(userInfo.city)
        }
    },[userInfo])
    const locationResponse = findLocation(city)
    const applyHandler = ()=>{
        const promises = [];
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if(phoneRef.current.value !== userInfo.phone){
            promises.push(updateUserPhone({uid:currentUser.uid,phone:phoneRef.current.value}))
        }
        if(city !== userInfo.city){
            promises.push(updateUserCity({uid:currentUser.uid,city:city}))
        }
        
        if(confirmPassword.currentErrors.length===0){
            promises.push(updateUserPassword(confirmPassword.value))
        }
        Promise.all(promises).then(()=>console.log('success'))
        .catch(err=>console.log(err))
    }
    const normilzeNumber = (value)=>{
        return value.replace(/\s/g,'').match(/.{1,4}/g)?.join(' ').substring(0,17)|| ' '
    }
   
    return (
        <div className={styles['info-settings']}>
             <ul className={styles.info}>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Email:
                    </div>
                    <div className={styles.input}>
                        <CInput ref={emailRef} height='50' mode='fullBorder' defaultValue={currentUser.email}  />
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        Phone:
                    </div>
                    <div className={styles.input}>
                        <CInput ref={phoneRef} height='50' mode='fullBorder' defaultValue={userInfo.phone}
                        onChange={(e)=>{
                            const {value} = e.target;
                            e.target.value = normilzeNumber(value)
                        }}  />
                    </div>
                </li>
                <li className={styles.info__item}>
                    <div className={styles['field-name']}>
                        City:
                    </div>
                    <div className={styles.input}>
                        <Autocomplete data={locationResponse} query={city} setQuery={setCity}>
                            <CInput mode='fullBorder' height='50' value={city} onChange={e=>setCity(e.target.value)} />
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
                                height='50'
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
                                height='50'
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
                    width='120px'
                    onClick={()=>navigate('/user-profile/info')}
                >Cancel</Button>
                <Button 
                    mode='primary' 
                    width='120px'
                    onClick={applyHandler}
                >Apply</Button>
            </div>
        </div>
    );
};

export default UserInfoSettings;