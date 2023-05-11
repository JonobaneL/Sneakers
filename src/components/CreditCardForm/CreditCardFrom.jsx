import CInput from '../UI/inputV2/CInput';
import styles from './CreaditCardForm.module.scss'

const CreditCardFrom = () => {
    return (
        <div className={styles['card-form']}>
            <div className={styles.number}>
                <CInput id="cardNumber-fullBorder-50" placeholder="Card Number"/>
            </div>
            <div className={styles.date}>
                <CInput id="cardDate-fullBorder-50" placeholder="MM/YY"/>
            </div>
            <div className={styles.cvv}>
                <CInput id="cardCVV-fullBorder-50" placeholder="CVV"/>
            </div>
        </div>
    );
};

export default CreditCardFrom;