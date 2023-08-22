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
            {/* <div className={styles.header}>
           
            <div className={styles.logo}>SNEAKERS</div>
            <motion.ul
            className={styles.nav}
                initial={{
                    width:'100%',
                }}
                animate={isOpen?{
                    width:0,
                    opacity:0,
                    paddingLeft:0,
                    transition:{
                        duration:0.4,
                    }
                }:{
                    width:'100%',
                    opacity:1,
                    transition:{
                        duration:0.4,
                        delay:0.3,
                    }
                }}
                >
                    <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                    <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                    <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                </motion.ul>
            <motion.div className={styles["search-wrapper"]}
                initial={{
                    width:'20%',
                }}
                animate={isOpen?{
                    width:'100%',
                    transition:{
                        duration:0.4,
                    }
                }:{
                    width:'20%',
                    transition:{
                        duration:0.4,
                        delay:0.3
                    }
                }}
            >
                <motion.div
                className={styles.search}
                // initial={{
                //     width:widthTriger?'2.5rem':'12rem',
                // }}
                animate={isOpen?{
                    width:widthTriger?'20rem':'30rem',
                    transition:{
                        duration:0.5,
                        delay:0.5
                    }
                }:{
                    width:'12rem',
                    transition:{
                        duration:0.2,
                    }
                }}
                
                >
                    <button className={styles.search__btn} onClick={()=>setIsOpen(true)}>
                        <img src={searchIcon} alt="search" />
                    </button>
                    <input onFocus={()=>setIsOpen(true)} className={styles.search__field} ref={searchRef} type="text" placeholder='Search...' />
                </motion.div>
            </motion.div>
            <motion.div
            className={styles['button-nav']}
                animate={!isOpen?{
                    width:'65px',
                    marginLeft:'10px',
                    transition:{
                        duration:0.4,
                        delay:0.3,
                    }
                }:{
                    width:0,
                    marginLeft:'0', 
                    transition:{
                        duration:0.4,
                    }
                }}
            >
                <Link to='/user-profile/favorites' className={styles.favorites}>
                    <img src={favoritesIcon} alt="favoritesIcon" />
                </Link>
                <Link to={'/shopping-cart'}>
                    <div className={styles.bag}>
                        <img src={shoppingBag} alt="shopping-bag" />
                        {cartQuantity==0?null:<div className={styles['cart-quantity']}>{cartQuantity}</div>}
                    </div>
                </Link>
            </motion.div>
            <motion.div
            className={styles.cancel}
                animate={isOpen?{
                    width:'131px',
                    transition:{
                        duration:0.4,
                        delay:0.3,
                    }
                }:{
                    width:0,
                    transition:{
                        duration:0.4,
                    }
                }}
            ><p onClick={()=>setIsOpen(false)}>
            Cancel
            </p></motion.div>
          
            </div> */}
            <motion.div layout transition={{
                duration:0.5,
            }}
            className={`${styles.block} ${isOpen?styles.active:''}`}>
            <motion.div layout transition={{
                duration:0.3,
                delay:1
            }} className={styles.child}></motion.div>
            </motion.div>
        </div>
    </div>;
}
 
export default About;