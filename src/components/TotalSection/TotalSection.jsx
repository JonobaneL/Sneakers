import { useSelector } from 'react-redux';
import styles from './TotalSection.module.scss'

const TotalSection = ({shippingSection=true,borders=true, discount=0,subTotal=0,total=0}) => {
    // const {discount,subTotal,total} = useSelector(state=>state.cartReducer)
    return (
        <ul className={`${styles.total} ${borders?styles.borders:''}`}>
           <li className={styles.total__item}>
                Subtotal
                <p className={styles.price}>${subTotal.toFixed(2)}</p>
           </li>
           <li className={styles.total__item}>
                Discount
                <p className={styles.price}>{discount}%</p>
           </li>
           {
            shippingSection &&<li className={styles.total__item}>
                Shipping
                <p className={styles.shipping__details}>according to the carrier's tariffs</p>
            </li>
           }
           <li className={styles.total__item}>
                Total
                <p className={styles.price}>${total.toFixed(2)}</p>
            </li> 
        </ul>
    );
};


export default TotalSection;