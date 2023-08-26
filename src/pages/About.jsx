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
            <br/>
            <br/>
            <br/>
            <motion.div 
                initial={false}
                animate={isOpen?{
                    gridTemplateColumns:'auto 0fr 1fr 0px 130px',
                    transition:{
                        duration:0.8,
                        ease:[0.76, 0, 0.24, 1]
                    }
                }:{
                    gridTemplateColumns:'auto 4fr 1fr auto 0px',
                    transition:{
                        duration:0.8,
                        ease:[0.76, 0, 0.24, 1]
                    }
                }}

                className={styles.wrapper}
            >
                <div className={styles.b1}></div>
                <div className={styles.b2}></div>
                <motion.div
                    animate={isOpen?{
                        paddingInline:'20%',
                        transition:{
                            delay:0.4
                        }
                    }:{
                        paddingInline:0,
                        transition:{
                            delay:0.3
                        }
                    }}
                className={styles.b3}>
                    <motion.div
                     className={styles.child}></motion.div>
                </motion.div>
                <div className={styles.b4}></div>
                <div className={styles.b5}></div>
            </motion.div>
           
            
        
        </div>
    </div>;
}
 
export default About;