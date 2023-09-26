import React, { useState } from 'react'
import styles from './CheckoutShipping.module.scss'
import ShippingForm from '../ShippingForm/ShippingForm'
import Button from '../UI/button/Button'
import AddressesList from '../AddressesList/AddressesList'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderShipping } from '../../redux/checkoutSlice'

const CheckoutShipping=({user})=> {
    const [addressUse,setAddressUse] = useState(false);
    const dispatch = useDispatch();
    const checkout = useSelector(state=>state.checkoutReducer)
  return (
    <div className={styles.shipping}>
        <h2 className={styles['section-title']}>Shipping</h2>
        {
            (user?.delivery_addresses?.length>0 && !addressUse)?<>
                <div>
                    <AddressesList 
                        addresses={user.delivery_addresses} 
                        triger={false}
                        callback={value=>{
                        dispatch(setOrderShipping(value))
                        }}
                    />
                </div>
                <div className={styles.another}>
                    <p
                        onClick={()=>{
                            dispatch(setOrderShipping(null))
                            setAddressUse(true);
                        }}
                    >Use Another Address</p>
                </div>
                
            </>
            :<>
                <ShippingForm city={user?.city||checkout.city} company={checkout?.shipping?.company} />
                {
                    user&&<div className={styles["button-bar"]}>
                        <Button 
                            mode='secondary'
                            width='140px'
                            height='45px' 
                            onClick={()=>setAddressUse(false)}   
                        >Cancel</Button>
                    </div>
                }
                
            </>
        }
    </div>
  )
}

export default CheckoutShipping