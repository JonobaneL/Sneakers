import { useShoppingCart } from '../../context/CartContext';
import { useShoes } from '../../hooks/useShoes';
import styles from './OrderSummaryList.module.scss'

const Item = ({id,colorId,size,quantity}) =>{
    const item = useShoes(id,colorId)
    return <li className={styles['list-item']}>
        <img className={styles['list-item__image']} src={item.images[1]} alt={item.name} />
        <div className={styles['list-item__info']}>
            <h4 className={styles['list-item__name']}>{item.name}</h4>
            <p>Size: {size}</p>
            <p>Color: {item.colorName}</p>
            <p>Qty: {quantity} x ${item.cost}</p>
            <p>${(quantity*item.cost).toFixed(2)}</p>
        </div>
    </li>
}

const OrdreSummaryList = () => {
    const {shoppingCart} = useShoppingCart();

    return ( 
        <ul className={styles.list}>
            {shoppingCart.map(item=>
                <Item key={`${item.id}#${item.colorId}#${item.size}`} {...item} />
                )}
        </ul>
     );
}
 
export default OrdreSummaryList;