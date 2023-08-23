import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';
import RadioButton from '../components/UI/radioButton/RadioButton';
import searchIcon from '../images/header-icons/search-icon.svg'
import userIcon from '../images/header-icons/user-icon.svg';
import favoritesIcon from '../images/header-icons/favorites.svg'
import shoppingBag from '../images/header-icons/shopping-bag.png';

import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useSelector } from 'react-redux';
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
            <div className="wrapper" style={{
                width:'100%',
                height:'100px',
                display:'flex',
                gap:'10px',
                // justifyContent:'right'
            }}>
            <motion.div
                initial={false}
                animate={isOpen?{
                    width:'100%',
                    transition:{
                        duration:0.3,
                        delay:0.3
                    }
                }:{
                    width:'12rem',
                    transition:{
                        delay:0.5,
                        duration:0.5,
                    }
                }}
                className={styles.block}>
            <motion.div 
                initial={false}
                animate={isOpen?{
                    width:'20rem',
                    transition:{
                        duration:0.3,
                        delay:0.9
                    }
                }:{
                    width:'12rem',
                    transition:{
                        duration:0.3,
                        delay:0
                    }
                }}
                 className={styles.child}></motion.div>
            </motion.div>
            <motion.div className="t" style={{
                width:'300px',
                height:"100px",
                background:'green'
            }}
                initia={false}
                animate={isOpen?{
                    width:0,
                    transition:{
                        duration:0.3,
                        // delay:0.1
                    }
                }:{
                    width:'300px',
                    transition:{
                        duration:0.3,
                        delay:0.5
                    }
                }}           
            ></motion.div>
            </div>
            {/* <motion.div
                initial={false}
                animate={isOpen?{
                    width:'100%',
                    transition:{
                        duration:0.3,
                        delay:0
                    }
                }:{
                    width:'12rem',
                    transition:{
                        delay:0.5,
                        duration:0.5,
                    }
                }}
                className={styles.block}>
            <motion.div 
                initial={false}
                animate={isOpen?{
                    width:'20rem',
                    transition:{
                        duration:0.3,
                        delay:0.5
                    }
                }:{
                    width:'12rem',
                    transition:{
                        duration:0.3,
                        delay:0
                    }
                }}
                 className={styles.child}></motion.div>
            </motion.div> */}
        </div>
    </div>;
}
 
export default About;