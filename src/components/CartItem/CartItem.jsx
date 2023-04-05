import styles from './CartItem.module.scss'
import { useShoes } from '../../hooks/useShoes';
import { useShoppingCart } from '../../context/CartContext';
import removeIcon from '../../images/cancel.svg'

const CartItem = ({id,colorId,size,quantity}) => {
    const {increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart()
    const item = useShoes(id,colorId)
    console.log(colorId)
    return (
        <div className={styles['cart-item']}>
            <img className={styles['product-image']} src={item.images[1]} alt={item.name} />
            <p className={styles['product-name']}>{item.name}</p>
            <p className={styles['product-size']}>{size}</p>
            <p className={styles['product-color']}>{item.colorName}</p>
            <p className={styles["product-total"]}>${(quantity*item.cost).toFixed(2)}</p>
            <div className={styles['product-quantity']}>
                <button 
                    className={styles.btn}
                    onClick={()=>{
                        decreaseCartQuantity(id,colorId,size)
                    }}
                >&#8722;</button>
                <p className={styles.quantity}>{quantity}</p>
                <button className={styles.btn}onClick={()=>increaseCartQuantity(id,colorId,size)}>+</button>
            </div>
        
        <button className={styles["remove-product"]} onClick={()=>removeFromCart(id,colorId,size)}>
            <img src={removeIcon} alt="" />
        </button>
    </div>
    )
}
 
export default CartItem;