import React, { useRef, useState } from 'react';
import styles from './ButtomHeader.module.scss'
import searchIcon from '../../images/header-icons/search-icon.svg'
import favoritesIcon from '../../images/header-icons/favorites.svg'
import shoppingBag from '../../images/header-icons/shopping-bag.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const navInitial = {
    width:'100%',
    opacity:1,
    paddingLeft:'10%',
    transition:{
        duration:0.4,
        delay:0.3,
    }
}
const navAnimate = {
    width:0,
    opacity:0,
    paddingLeft:0,
    transition:{
        duration:0.4,
    }
}
const searchWrapperInitial = {
    width:'100%',
    transition:{ 
        duration:0.4,
    }
}
const searchWrapperAnimate = {
    width:'22%',
    transition:{
        duration:0.4,
        delay:0.3
    }
}
const searchInitial = {
    width:'100%',
    transition:{
        duration:0.4,
    }
}
const searchAnimate = {
    width:'30rem',
    transition:{
        duration:0.5,
        delay:0.5
    }
}
// попробувати зробити так мб заканає
// const variant = {
//     closed:(screenWidth)=>{
//         if(screenWidth<1024){
//             return {
//                 someStyles
//             }
//         }else{
//             return {
//                 width:'22%',
//                 transition:{
//                     duration:0.4,
//                     delay:0.3
//                 }
//             }
//         }
//     },
//     opened:(screenWidth)=>{
//         if(screenWidth<1024){
//             return {
//                 someStyles
//             }
//         }else{
//             return {
//                 width:'100%',
//                 transition:{ 
//                     duration:0.4,
//                 }
//             }
//         } 
//     }
// }
const ButtomHeader = () => {
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const {cartQuantity} = useSelector(state=>state.cartReducer)
    const widthTriger = window.screen.availWidth < 1000;
    const searchRef = useRef();
    return (
        <div className={styles.header}>
            <motion.div layout className={styles.content}>
                <div className={styles.logo}>
                    <Link to={`/`}>
                        <h1>SNEAKERS</h1>
                    </Link>
                </div>
                <motion.ul
                    className={styles.nav}
                    initial={false}
                    animate={isSearchOpen?navAnimate:navInitial}
                >
                    <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                    <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                    <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                </motion.ul>

                <motion.div 
                    className={styles["search-wrapper"]}
                    initial={false}
                    animate={isSearchOpen?searchWrapperInitial:searchWrapperAnimate}
                >
                    <motion.div
                        className={styles.search}
                        // initial={{
                        //     width:'12rem',
                        // }}
                        initial={false}
                        animate={isSearchOpen?{
                            width:'30rem',
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
                        <button className={styles.search__btn} onClick={()=>setIsSearchOpen(true)}>
                            <img src={searchIcon} alt="search" />
                        </button>
                        <input  onFocus={()=>setIsSearchOpen(true)} className={styles.search__field} ref={searchRef} type="text" placeholder='Search...' />
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles['button-nav']}
                    animate={!isSearchOpen?{
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

                <motion.button
                    className={styles.cancel}
                    animate={isSearchOpen?{
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
                    onClick={()=>setIsSearchOpen(false)}
                >Cancel</motion.button>
            </motion.div>
        </div>
    );
};


export default ButtomHeader;