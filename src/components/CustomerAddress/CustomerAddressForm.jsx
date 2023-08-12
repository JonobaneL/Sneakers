import CInput from '../UI/input/CInput';
import styles from './CustomerAddressForm.module.scss'
const CustomerAddressForm = ({address,onChange}) => {
    return (
        <div className={styles.addressForm}>
            <div className={styles.address}>
                <CInput 
                    mode='fullBorder' 
                    height={45} 
                    placeholder='Address*'
                    value={address.address ||''}
                    onChange={e=>onChange(current=>{return {...current,address:e.target.value}})}
                />
            </div>
            <div className={styles.apartment}>
                <CInput 
                    mode='fullBorder' 
                    height={45}  
                    placeholder='Apartment*'
                    type='number'
                    value={address.appartment || ''}
                    onChange={e=>onChange(current=>{return {...current,appartment:e.target.value}})}
                />
            </div>
        </div>
    );
};


export default CustomerAddressForm;