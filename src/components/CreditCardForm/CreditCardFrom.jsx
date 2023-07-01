import CInput from '../UI/input/CInput';
import styles from './CreaditCardForm.module.scss'

const CreditCardFrom = () => {
    return (
        <div className={styles['card-form']}>
            <div className={styles.number}>
                <CInput 
                    id="cardNumber" 
                    placeholder="Card Number"
                    mode='fullBorder'
                    height={45}
                    />
            </div>
            <div className={styles.date}>
                <CInput 
                    id="cardDate" 
                    placeholder="MM/YY"
                    mode='fullBorder'
                    height={45}
                    />
            </div>
            <div className={styles.cvv}>
                <CInput 
                    id="cardCVV" 
                    placeholder="CVV"
                    mode='fullBorder'
                    height={45}
                    />
            </div>
        </div>
    );
};

export default CreditCardFrom;