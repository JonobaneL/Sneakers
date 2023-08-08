import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';

const About = () => {
    const {currentUser} = useAuth();
    const userInfo = getUser(currentUser.uid)
  
    return <div className={styles.about}>
        <div className={styles.content} >
        {
            userInfo.delivery_addresses?<RadioList
            list={userInfo.delivery_addresses.map(item=>{
                return{
                    id:item.addressID,
                    value:item.addressID,
                    label:`${item.address} ${item.appartment}`,
                }
            })}
            groupName='delivery_adresses'
            >
            </RadioList>
            :null
        }
            
            
            
        </div>
    </div>;
}
 
export default About;