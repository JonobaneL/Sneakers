import styles from './CartItem.module.scss'
import { useProduct } from '../../hooks/useProduct';
import removeIcon from '../../images/cancel.svg'
import Button from '../../components/UI/button/Button';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from '../../redux/cartSlice';


const CartItem = (item) => {
    const productDetails = useProduct(item.productID,item.modelID)
    const dispatch = useDispatch()
    const btnWidth = window.screen.availWidth>1180?'30px':'25px';
    return (
        <div className={styles['cart-item']}>
            <img className={styles['product-image']} src={productDetails.images[1]} alt={item.name} />
            <p className={styles['product-name']}>{item.name}</p>
            <p className={`${styles['product-size']} ${styles.details}`}><span className={styles.parameter}>Size: </span>{item.size}</p>
            <p className={`${styles['product-model']} ${styles.details}`}><span className={styles.parameter}>Color: </span>{item.currentModelName}</p>
            <div className={`${styles["product-total"]} ${styles.details}`}>
                <p className={productDetails.discount?styles.price__diabled:styles.price}>${item.price*item.quantity}</p>
                {(productDetails.discount>0)?
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
                        dispatch(decreaseCartQuantity({
                            productID:item.productID,
                            modelID:item.modelID,
                            size:item.size
                        }))
                    }}
                ><span className={styles.btn}>&#8722;</span></Button>
                <p className={styles.quantity}>{item.quantity}</p>
                <Button 
                    mode='secondary'
                    width={btnWidth}
                    height={btnWidth}
                    onClick={()=>{
                        dispatch(increaseCartQuantity({
                            productID:item.productID,
                            modelID:item.modelID,
                            size:item.size
                        }))
                    }}
                ><span className={styles.btn}>+</span></Button>
            </div>
        
        <button className={styles["remove-product"]} onClick={()=>{
            dispatch(removeFromCart({
                productID:item.productID,
                modelID:item.modelID,
                size:item.size
            }))
        }}>
            <img src={removeIcon} alt="" />
        </button>
    </div>
    )
}
 
export default CartItem;