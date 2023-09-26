import { useDispatch, useSelector } from 'react-redux';
import CInput from '../UI/input/CInput';
import styles from './CustomerAddressForm.module.scss'
import { setOrderAddress } from '../../redux/checkoutSlice';
const CustomerAddressForm = () => {
    const dispatch = useDispatch();
    const checkout = useSelector(state=>state.checkoutReducer)
    return (
        <div className={styles.addressForm}>
            <div className={styles.address}>
                <CInput 
                    mode='fullBorder' 
                    height={45} 
                    placeholder='Address*'
                    value={checkout?.shipping?.address||''}
                    onChange={e=>dispatch(setOrderAddress({type:'address',value:e.target.value}))}
                />
            </div>
            <div className={styles.apartment}>
                <CInput 
                    mode='fullBorder' 
                    height={45}  
                    placeholder='Apartment*'
                    type='number'
                    value={checkout?.shipping?.appartment||''}
                    onChange={e=>dispatch(setOrderAddress({type:'appartment',value:e.target.value}))}
                />
            </div>
        </div>
    );
};


export default CustomerAddressForm;