import React, { useState } from 'react'
import styles from './CheckoutShipping.module.scss'
import ModalWindow from '../ModalWindow/ModalWindow'
import CityForm from '../CityForm/CityForm';
import RadioList from '../RadioList/RadioList'
import { getPostOffice } from '../../utils/getPostOffice'
import mapPoint from '../../images/map-pointer.svg'
import rightArrow from '../../images/right-arrow.svg'
import Select from '../UI/select/Select';
import CustomerAddressForm from '../CustomerAddress/CustomerAddressForm';


const CheckoutShipping = ({city,address,onChange}) => {
    const [currentCity,setCurrentCity] = useState(city||{})
    const ukrposhtaOffices = getPostOffice(currentCity.id,'ukrposhta')
    const novaposhtaOffices = getPostOffice(currentCity.id,'novaposhta')
    const [isCityModalOpen,setIsCityModalOpen] = useState(false);
    const validRadio = currentCity.id>0?false:true;
    const closeModalWindowHandler = ()=>{
        setIsCityModalOpen(false)
    }
    const handler = (param)=>{
        console.log(param)
    }
  return (
    <div className={styles.shipping}>
        <div className={styles.city} onClick={()=>setIsCityModalOpen(true)}>
            <img className={styles.city__pointIcon} src={mapPoint} alt="Map point" />
            <p className={styles.city__name}>
                {
                currentCity.id?<>
                    Your city is<span className={styles.city__current}>{currentCity.name}</span>
                </>:'Choose your city'
                }
            </p>
            <button className={styles.city__arrow}>
                <img src={rightArrow} alt="" />
            </button>
        </div>
        <ModalWindow isOpen={isCityModalOpen} closeHandler={closeModalWindowHandler} title='Choose your city'>
            <CityForm currentCity={currentCity} setCity={setCurrentCity} applyCallback={closeModalWindowHandler}/>
        </ModalWindow>
            <RadioList 
                list={[
                    {id:'opt1',label:'Pickup from Ukrposhta',value:'Ukr Poshta1',disabled:validRadio},
                    {id:'opt2',label:'Courier Ukrposhta',value:'Ukr Poshta2',disabled:validRadio},
                    {id:'opt3',label:'Pickup from Nova Poshta',value:'Nova Poshta1',disabled:validRadio},
                    {id:'opt4',label:'Courier Nova Poshta',value:'Nova Poshta2',disabled:validRadio},
                ]}
                groupName='shipping'
                callback={value=>onChange(current=>{return {...current,company:value.slice(0,-1)}})}
            >
                <div className={styles['option-wrapper']} >
                    <Select placeholder='Select a post office'
                        params={ukrposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                        getData={handler}
                        type='borderType'
                        height='45px'
                    />
                </div>
                <div className={styles['option-wrapper']} >
                    <CustomerAddressForm address={address} onChange={onChange} />
                </div>
                <div className={styles['option-wrapper']} >
                    <Select placeholder='Select a post office'
                    params={novaposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                    getData={handler}
                    type='borderType'
                    height='50px'
                    />
                </div>
                <div className={styles['option-wrapper']}>
                    <CustomerAddressForm address={address} onChange={onChange} />
                </div>
            </RadioList>
    </div>
  )
}

export default CheckoutShipping;