import styles from './CartItem.module.scss'
import { useShoes } from '../../hooks/useShoes';
import { useShoppingCart } from '../../context/CartContext';
import removeIcon from '../../images/cancel.svg'

const CartItem = ({id,colorId,size,quantity}) => {
    const {increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const item = useShoes(id,colorId)
    console.log(colorId)
    return <div className={styles['cart-item']}>
        <div className={styles.image}>
            <img src={item.images[1]} alt={item.name} />
        </div>
        <div className={styles.info}>
            <h3 className={styles['product-name']}>{item.name}</h3>
            <p>Color: {item.colorName}</p>
            <p>Size: {size}</p>
        </div>
        <div className={styles['product-quantity']}>
            <button 
                className={styles.btn}
                onClick={()=>{
                    decreaseCartQuantity(id,colorId,size)
                }}
            >-</button>
            <p className={styles.quantity}>{quantity}</p>
            <button className={styles.btn}onClick={()=>increaseCartQuantity(id,colorId,size)}>+</button>
        </div>
        <div className={styles["product-cost"]}>
            ${(quantity*item.cost).toFixed(2)}
        </div>
        <button className={styles["remove-product"]} onClick={()=>removeFromCart(id,colorId,size)}>
            <img  src={removeIcon} alt="" />
        </button>
    </div>;
}
 
export default CartItem;