import React, { useState } from 'react';
import styles from './AddressFrom.module.scss';
import InfoTabs from '../UI/info-tabs/InfoTabs';
import Select from '../UI/select/Select';
import CInput from '../UI/input/CInput';
import Button from '../UI/button/Button';
import { useInput } from '../../hooks/useInput';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import { getPostOffice } from '../../utils/getPostOffice';
import { addDeliveryAddress } from '../../firebase/userFirebaseAPI';
import { findLocation } from '../../utils/searchLocation';

const AddressFrom = ({city,userID,closeHandler,triger}) => {
    const address = useInput('',{isEmpty:true},{isEmpty:'Please enter your address'})
    const appartment = useInput('',{isEmpty:true},{isEmpty:'Please enter your appartment'})
    const [company,setCompany] = useState('');
    const currentCity = findLocation(city.name);
    const postalOffices = getPostOffice(currentCity[0].id,company);
    const [postalOffice,setPostalOffice] = useState('')
    const [tabIndex,setTabIndex] = useState(0);
    const addAddress = async(e)=>{
        e.preventDefault();
        if(tabIndex==0){
            if(address.isValid && appartment.isValid){
                try{
                    addDeliveryAddress({
                        uid:userID,
                        address:{
                            addressID: `address${Date.now()}`,
                            company:company,
                            address:address.value,
                            appartment:appartment.value
                        }
                    })
                    closeHandler();
                    triger();
                }catch(err){
                    console.log(err)
                }
            }
        }else{
            if(postalOffice){
                try{
                    addDeliveryAddress({
                        uid:userID,
                        address:{
                            addressID: `address${Date.now()}`,
                            company:company,
                            postal_office:postalOffice
                        }
                    })
                    closeHandler();
                    triger();
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
    return (
        <div className={styles.address}>
            <form onSubmit={addAddress}>
                <div className={styles.company}>
                <Select 
                    placeholder='Select company'
                    params={[
                        {id:1,value:"Ukr Poshta"},
                        {id:2,value:"Nova Poshta"},
                    ]}
                    getData={(value)=>setCompany(value.value)}
                    type='borderType'
                    height='45px'
                />
                </div>
                
                <InfoTabs
                    titles={['Courier','Postal Office']}
                    getCurrentTab={(index)=>setTabIndex(index)}
                >
                    <div className={styles.tab}>
                        <ValidationErrorMessages errorMessages={address.currentErrors} durty={address.isDurty}>
                            <CInput 
                                placeholder="Address*" 
                                height='45' 
                                mode='fullBorder'
                                onChange={e=>address.onChange(e)}
                                onBlur={e=>address.onBlur(e)}
                                value={address.value}
                                valid={address.isDurty && address.currentErrors.length>0}
                                />
                        </ValidationErrorMessages>
                        <ValidationErrorMessages errorMessages={appartment.currentErrors} durty={appartment.isDurty}>
                            <CInput 
                                placeholder="Appartment*" 
                                height='45' 
                                mode='fullBorder'
                                onChange={e=>appartment.onChange(e)}
                                onBlur={e=>appartment.onBlur(e)}
                                value={appartment.value}
                                type='number'
                                valid={appartment.isDurty && appartment.currentErrors.length>0}
                            />
                        </ValidationErrorMessages>
                    </div>
                    <div className={styles.tab}>
                        <Select placeholder='Select a post office'
                            params={postalOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                            getData={option=>setPostalOffice(option.value)}
                            type='borderType'
                            height='50px'
                            optionsHeight='120px'
                        />
                    </div>
                </InfoTabs>
                <div className={styles["button-bar"]}>
                    <Button
                        mode='primary'
                        width='140px'
                        height='45px'
                        type='submit'
                    >Save</Button>
                </div>
            </form>
        </div>
    );
};


export default AddressFrom;