import styles from './CartItem.module.scss'
import { useProduct } from '../../hooks/useProduct';
import { useShoppingCart } from '../../context/CartContext';
import removeIcon from '../../images/cancel.svg'
import Button from '../../components/UI/button/Button';


const CartItem = ({id,colorId,size,quantity}) => {
    const {increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const item = useProduct(id,colorId)
    const btnWidth = window.screen.availWidth>1180?'30px':'25px';
    return (
        <div className={styles['cart-item']}>
            <img className={styles['product-image']} src={item.images[1]} alt={item.name} />
            <p className={styles['product-name']}>{item.name}</p>
            <p className={`${styles['product-size']} ${styles.details}`}><span className={styles.parameter}>Size: </span>{size}</p>
            <p className={`${styles['product-color']} ${styles.details}`}><span className={styles.parameter}>Color: </span>{item.colorName}</p>
            <p className={`${styles["product-total"]} ${styles.details}`}>${(quantity*item.cost).toFixed(2)}</p>
            <div className={styles['product-quantity']}>
                <span className={styles.parameter}>Qty: </span>
                <Button 
                    mode='secondary'
                    width={btnWidth}
                    height={btnWidth}
                    onClick={()=>{
                        decreaseCartQuantity(id,colorId,size)
                    }}
                ><span className={styles.btn}>&#8722;</span></Button>
                <p className={styles.quantity}>{quantity}</p>
                <Button 
                    mode='secondary'
                    width={btnWidth}
                    height={btnWidth}
                    onClick={()=>increaseCartQuantity(id,colorId,size)}
                ><span className={styles.btn}>+</span></Button>
            </div>
        
        <button className={styles["remove-product"]} onClick={()=>removeFromCart(id,colorId,size)}>
            <img src={removeIcon} alt="" />
        </button>
    </div>
    )
}
 
export default CartItem;