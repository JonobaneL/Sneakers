import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { getCategories, getProduct, getProductModel, getProducts } from '../firedbAPI';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import { useProduct } from '../hooks/useProduct';
import SizeSelect from '../components/UI/sizeSelect/SizeSelect';
import ColorSelect from '../components/UI/colorSelect/ColorSelect';
import Button from '../components/UI/button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,increaseCartQuantity,decreaseCartQuantity, removeFromCart } from '../redux/cartSlice.js';


const About = () => {
  const cart = useSelector(state=>state.cartReducer)
  console.log(cart)
  const dispatch = useDispatch();
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles["approved-filters"]}>
              <Button mode='primary' width='150px' height='40px'
              onClick={()=>dispatch(addToCart({productID:'abc',modelID:'def',size:'8',price:10,cost:7}))}
              >Add product</Button>
              <Button mode='primary' width='150px' height='40px'
              onClick={()=>dispatch(addToCart({productID:'mkl',modelID:'jis',size:'9',price:50,cost:50}))}
              >Add product1</Button>
              <Button mode='primary' width='180px' height='40px'
              onClick={()=>dispatch(increaseCartQuantity({productID:'abc',modelID:'def',size:'8'}))}
              >Increase product</Button>
              <Button mode='primary' width='180px' height='40px'
              onClick={()=>dispatch(decreaseCartQuantity({productID:'abc',modelID:'def',size:'8'}))}
              >Decrease product</Button>
              <Button mode='primary' width='180px' height='40px'
              onClick={()=>dispatch(removeFromCart({productID:'abc',modelID:'def',size:'8'}))}
              >Remove product</Button>
          </div>
          
        </div>
    </div>;
}
 
export default About;