import { useDispatch, useSelector } from 'react-redux';
import { normilizeDate, normilzeCardNumber } from '../../utils/normalizeMethods';
import CInput from '../UI/input/CInput';
import styles from './CreaditCardForm.module.scss'
import { setCardInfo } from '../../redux/checkoutSlice';

const CreditCardFrom = () => {
    const dispatch = useDispatch();
    const checkout = useSelector(state=>state.checkoutReducer)
    return (
        <div className={styles['card-form']}>
            <div className={styles.number}>
                <CInput 
                    id="cardNumber" 
                    placeholder="Card Number"
                    mode='fullBorder'
                    height={45}
                    value={checkout?.card?.cardNumber||''}
                    onChange={e=>{
                        const value = e.target.value.replace(/[^0-9]/gi, '')
                        e.target.value = normilzeCardNumber(value,number=>dispatch(setCardInfo({...checkout?.card,cardNumber:number})))
                    }}
                    />
            </div>
            <div className={styles.date}>
                <CInput 
                    id="cardDate" 
                    placeholder="MM/YY"
                    mode='fullBorder'
                    height={45}
                    value={checkout?.card?.date||''}
                    onChange={e=>{
                        const {value} = e.target;
                        e.target.value = normilizeDate(value,date=>dispatch(setCardInfo({...checkout?.card,date:date})))
                    }}
                    />
            </div>
            <div className={styles.cvv}>
                <CInput 
                    id="cardCVV" 
                    placeholder="CVV"
                    mode='fullBorder'
                    height={45}
                    value={checkout?.card?.cvv||''}
                    maxLength="3"
                    onChange={e=>{
                        const value = e.target.value.replace(/[^0-9]/gi, '')
                        dispatch(setCardInfo({...checkout?.card,cvv:value}))
                    }}
                    />
            </div>
        </div>
    );
};

export default CreditCardFrom;