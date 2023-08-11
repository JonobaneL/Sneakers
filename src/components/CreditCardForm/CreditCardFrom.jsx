import CInput from '../UI/input/CInput';
import styles from './CreaditCardForm.module.scss'

const CreditCardFrom = ({cardData,callback}) => {
    return (
        <div className={styles['card-form']}>
            <div className={styles.number}>
                <CInput 
                    id="cardNumber" 
                    placeholder="Card Number"
                    mode='fullBorder'
                    height={45}
                    value={cardData.cartNumber}
                    onChange={e=>callback({...cardData,cartNumber:e.target.value})}
                    />
            </div>
            <div className={styles.date}>
                <CInput 
                    id="cardDate" 
                    placeholder="MM/YY"
                    mode='fullBorder'
                    height={45}
                    value={cardData.date}
                    onChange={e=>callback({...cardData,date:e.target.value})}
                    />
            </div>
            <div className={styles.cvv}>
                <CInput 
                    id="cardCVV" 
                    placeholder="CVV"
                    mode='fullBorder'
                    height={45}
                    value={cardData.cvvNumber}
                    onChange={e=>callback({...cardData,cvvNumber:e.target.value})}
                    />
            </div>
        </div>
    );
};

export default CreditCardFrom;