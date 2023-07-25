import { useSelector } from 'react-redux';
import { useProduct } from '../../hooks/useProduct';
import styles from './OrderSummaryList.module.scss'

const Item = ({productID,modelID,size,quantity,cost}) =>{
    const item = useProduct(productID,modelID)
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
    const cart = useSelector(state=>state.cartReducer);
    console.log(cart)
    return ( 
        <ul className={styles.list}>
            {cart.shoppingCart.map((item,index)=>
                <Item key={index} {...item} />
                )}
        </ul>
     );
}
 
export default OrdreSummaryList;