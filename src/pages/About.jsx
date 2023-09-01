import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../firebase/fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';
import RadioButton from '../components/UI/radioButton/RadioButton';
import searchIcon from '../images/header-icons/search-icon.svg'
import userIcon from '../images/header-icons/user-icon.svg';
import favoritesIcon from '../images/header-icons/favorites.svg'
import shoppingBag from '../images/header-icons/shopping-bag.png';

import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useSelector } from 'react-redux';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import OrdreSummaryList from '../components/OrderSummaryList/OrderSummaryList';
const About = () => {
    const searchRef = useRef('')
    const [isOpen,setIsOpen] = useState(false);
    const {cartQuantity} = useSelector(state=>state.cartReducer)

    const searchAnimate = {

    }
    const searchInitial = {
        
    }
    const widthTriger = window.screen.availWidth < 1000;
    return <div className={styles.about}>
        <div className={styles.content} >
            <button onClick={()=>setIsOpen(p=>!p)}>Open</button>

            <OrdreSummaryList cart={[{productID:'123',modelID:'fdf'}]} loader={false}/>
            
        
        </div>
    </div>;
}
 
export default About;