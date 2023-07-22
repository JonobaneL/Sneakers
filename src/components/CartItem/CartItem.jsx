import styles from './CartItem.module.scss'
import { useProduct } from '../../hooks/useProduct';
import removeIcon from '../../images/cancel.svg'
import Button from '../../components/UI/button/Button';
import { useDispatch } from 'react-redux';
import { asyncDecreaseCartQuantity, asyncIncreaseCartQuantity, asyncRemoveFromCart } from '../../redux/cartSlice';


const CartItem = ({productID,modelID,size,quantity}) => {
    const item = useProduct(productID,modelID)
    const dispatch = useDispatch()
    const btnWidth = window.screen.availWidth>1180?'30px':'25px';
    return (
        <div className={styles['cart-item']}>
            <img className={styles['product-image']} src={item.images[1]} alt={item.name} />
            <p className={styles['product-name']}>{item.name}</p>
            <p className={`${styles['product-size']} ${styles.details}`}><span className={styles.parameter}>Size: </span>{size}</p>
            <p className={`${styles['product-model']} ${styles.details}`}><span className={styles.parameter}>Color: </span>{item.currentModelName}</p>
            <div className={`${styles["product-total"]} ${styles.details}`}>
                <p className={item.discount?styles.price__diabled:styles.price}>${item.price}</p>
                {(item.discount>0)?
                    <p className={styles.price__discount}>${item.cost}</p>
                    : null
                }
                </div>
            <div className={styles['product-quantity']}>
                <span className={styles.parameter}>Qty: </span>
                <Button 
                    mode='secondary'
                    width={btnWidth}
                    height={btnWidth}
                    onClick={()=>{
                        dispatch(asyncDecreaseCartQuantity({productID,modelID,size}))
                    }}
                ><span className={styles.btn}>&#8722;</span></Button>
                <p className={styles.quantity}>{quantity}</p>
                <Button 
                    mode='secondary'
                    width={btnWidth}
                    height={btnWidth}
                    onClick={()=>{
                        dispatch(asyncIncreaseCartQuantity({productID,modelID,size}))
                    }}
                ><span className={styles.btn}>+</span></Button>
            </div>
        
        <button className={styles["remove-product"]} onClick={()=>{
            dispatch(asyncRemoveFromCart({productID,modelID,size}))
        }}>
            <img src={removeIcon} alt="" />
        </button>
    </div>
    )
}
 
export default CartItem;