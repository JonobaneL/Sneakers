import styles from './CartItem.module.scss'
import { shoes } from '../../data/shoes'

const CartItem = ({id,color,size,quantity}) => {
    const item = {}
    const getProduct=(id,colorId)=>{
        const productResponse = shoes.find(item=>item.id=id);
        const colorResponse = shoes.find(item=>item.id==colorId)
        return {name:productResponse.name,color:colorResponse.title,image:colorResponse.images[1],}
    }
    return <div className={styles['cart-item']}>
        <div className={styles.image}>
            <img src={item.img} alt={item.name} />
        </div>
        <div className={styles.info}>
            <h3 className={styles['product-name']}>{item.name}</h3>
            {/* <p>{item.}</p> */}
            <p>Color: {item.color}</p>
            <p>Size: {item.size}</p>
            {/* <p className={styles['product-price']}>${item.price}</p> */}
        </div>
        <div className={styles['product-cost']}>
            <button 
                className={styles.btn}
                onClick={()=>{
                    item.quantity=item.quantity+1
                }}
            >-</button>
            <p>{item.quantity}</p>
            <button className={styles.btn}>+</button>
        </div>
    </div>;
}
 
export default CartItem;