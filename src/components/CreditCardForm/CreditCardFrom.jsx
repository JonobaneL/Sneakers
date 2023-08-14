import { normilizeDate, normilzeCardNumber } from '../../utils/normalizeMethods';
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
                    onChange={e=>{
                        const {value} = e.target;
                        e.target.value = normilzeCardNumber(value,number=>callback({...cardData,cartNumber:number}))
                    }}
                    />
            </div>
            <div className={styles.date}>
                <CInput 
                    id="cardDate" 
                    placeholder="MM/YY"
                    mode='fullBorder'
                    height={45}
                    value={cardData.date}
                    onChange={e=>{
                        const {value} = e.target;
                        e.target.value = normilizeDate(value,date=>callback({...cardData,date:date}))
                    }}
                    />
            </div>
            <div className={styles.cvv}>
                <CInput 
                    id="cardCVV" 
                    placeholder="CVV"
                    mode='fullBorder'
                    height={45}
                    value={cardData.cvv}
                    maxLength="3"
                    onChange={e=>callback({...cardData,cvv:e.target.value})}
                    />
            </div>
        </div>
    );
};

export default CreditCardFrom;