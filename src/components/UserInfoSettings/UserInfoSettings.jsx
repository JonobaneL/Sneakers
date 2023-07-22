import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './UserInfoSettings.module.scss'
import { useAuth } from '../../context/AuthContext'
import { getUser, updateUserCity, updateUserPhone } from '../../fireAuthAPI';
import CInput from '../UI/input/CInput';
import Button from '../UI/button/Button';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import { findLocation } from '../../utils/searchLocation';
import { useNavigate } from 'react-router-dom';

const UserInfoSettings = () => {
    const {currentUser, updateUserEmail, updateUserPassword} = useAuth();
    const userInfo = getUser(currentUser.uid);
    const emailRef = useRef();
    const phoneRef = useRef();
    const [city, setCity] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        if(userInfo.city){
            setCity(userInfo.city)
        }
    },[userInfo])
    const locationResponse = findLocation(city)
    const applyHandler = ()=>{
        console.log(currentUser.email)
        console.log(emailRef.current.value)
        const promises = [];
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateUserEmail(emailRef.current.value))
        }
        if(phoneRef.current.value !== userInfo.phone){
            promises.push(updateUserPhone({uid:currentUser.uid,phone:phoneRef.current.value}))
        }
        if(city !== userInfo.city){
            promises.push(updateUserCity({uid:currentUser.uid,phone:phoneRef.current.value}))
        }
        Promise.all(promises).then(()=>console.log('success'))
        .catch(err=>console.log(err))
    }
    return (
        <div className={styles['info-settings']}>
             <ul className={styles.info}>
                <li>
                    <div className={styles['field-name']}>
                        Email:
                    </div> 
                    <CInput ref={emailRef} mode='fullBorder' defaultValue={currentUser.email}  />
                </li>
                <li>
                    <div className={styles['field-name']}>
                        Phone:
                    </div> 
                    <CInput ref={phoneRef} onFocus={e=>e.target.value=''} mode='fullBorder' defaultValue={userInfo.phone}  />
                </li>
                <li>
                    <div className={styles['field-name']}>
                        City:
                    </div>
                    <Autocomplete data={locationResponse} query={city} setQuery={setCity}>
                        <CInput mode='fullBorder' value={city} onChange={e=>setCity(e.target.value)} />
                    </Autocomplete> 
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