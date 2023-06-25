import CInput from '../UI/input/CInput';
import styles from './CustomerAddressForm.module.scss'
const CustomerAddressForm = () => {
    return (
        <div className={styles.addressForm}>
            <div className={styles.address}>
                <CInput mode='fullBorder' height={45} placeholder='Address*'/>
            </div>
            <div className={styles.apartment}>
                <CInput mode='fullBorder' height={45}  placeholder='Apartment*'/>
            </div>
        </div>
    );
};


export default CustomerAddressForm;