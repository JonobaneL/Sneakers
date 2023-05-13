import { useShoppingCart } from '../../context/CartContext';
import styles from './TotalSection.module.scss'

const TotalSection = ({shippingSection=true}) => {
    const {cartSubTotal,cartDiscount,cartTotal} = useShoppingCart();
    return (
        <ul className={styles.total}>
           <li className={styles.total__item}>
                Subtotal
                <p className={styles.price}>${cartSubTotal}</p>
           </li>
           <li className={styles.total__item}>
                Discount
                <p className={styles.price}>{cartDiscount}%</p>
           </li>
           {
            shippingSection &&<li className={styles.total__item}>
                Shipping
                <p className={styles.shipping__details}>according to the carrier's tariffs</p>
            </li>
           }
           <li className={styles.total__item}>
                Total
                <p className={styles.price}>${cartTotal()}</p>
            </li> 
        </ul>
    );
};


export default TotalSection;