import styles from './CustomerAddressForm.module.scss'
const CustomerAddressForm = () => {
    return (
        <div className={styles.addressForm}>
            <div className={styles.address}><input className={styles.customInput} type="text" placeholder='Address*' /></div>
            <div className={styles.apartment}><input className={styles.customInput} type="text" placeholder='Apartment*' /></div>
            
            
        </div>
    );
};


export default CustomerAddressForm;