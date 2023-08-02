import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
// import { getCart, getCategories, getProduct, getProductModel, getProducts } from '../firebase/cartFirebaseAPI ';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import { useProduct } from '../hooks/useProduct';
import SizeSelect from '../components/UI/sizeSelect/SizeSelect';
import ColorSelect from '../components/UI/colorSelect/ColorSelect';
import Button from '../components/UI/button/Button';
import { getAllProductsModels, getProduct } from '../firebase/productFirebaseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchFavorites } from '../redux/favoritesSlice';
import { signUp1, signUp2 } from '../redux/authSlice';


const About = () => {
  const dispatch = useDispatch();
  const user1 = useSelector(state=>state.authReducer)
  const handler = ()=>{
    dispatch(signUp2({email:'kdaflkflkdlf@gmail.com',password:'dffsfsfsfdf'}))
  }
  console.log(user1)
    return <div className={styles.about}>
        <div className={styles.content} >
         <button
         style={{height:'100px'}}
         onClick={handler}
         >Sing Up</button>
          
        </div>
    </div>;
}
 
export default About;