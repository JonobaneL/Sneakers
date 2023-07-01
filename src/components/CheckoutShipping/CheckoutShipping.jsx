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


const CheckoutShipping = () => {
    const [currentCity,setCurrentCity] = useState({})
    const ukrposhtaOffices = getPostOffice(currentCity.id,'ukrposhta')
    const novaposhtaOffices = getPostOffice(currentCity.id,'novaposhta')
    const [isCityModalOpen,setIsCityModalOpen] = useState(false);
    const validRadio = currentCity.id>0?false:true;
    const closeModalWindowHandler = ()=>{
        setIsCityModalOpen(false)
    }
    const hadler = (param)=>{
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
                    {id:'opt1',label:'Pickup from Ukrposhta',value:'ukrposhta-prickup',disabled:validRadio},
                    {id:'opt2',label:'Courier Ukrposhta',value:'ukrposhta-courier',disabled:validRadio},
                    {id:'opt3',label:'Pickup from Nova Poshta',value:'novaposhta-prickup',disabled:validRadio},
                    {id:'opt4',label:'Courier Nova Poshta',value:'novaposhta-courier',disabled:validRadio},
                ]}
                groupName='shipping'
            >
                <div className={styles['option-wrapper']} >
                    <Select placeholder='Select a post office'
                    params={ukrposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                    getData={hadler}
                    type='borderType'
                    height='45px'
                    />
                </div>
                <div className={styles['option-wrapper']} >
                    <CustomerAddressForm />
                </div>
                <div className={styles['option-wrapper']} >
                    <Select placeholder='Select a post office'
                    params={novaposhtaOffices.map(item=>{return {id:item.id,value:`${item.name}, ${item.street}`}})}
                    getData={hadler}
                    type='borderType'
                    height='50px'
                    />
                </div>
                <div className={styles['option-wrapper']}>
                    <CustomerAddressForm />
                </div>
            </RadioList>
    </div>
  )
}

export default CheckoutShipping;