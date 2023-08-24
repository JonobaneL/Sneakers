import React, { useRef, useState } from 'react';
import styles from './ButtomHeader.module.scss'
import searchIcon from '../../images/header-icons/search-icon.svg'
import favoritesIcon from '../../images/header-icons/favorites.svg'
import shoppingBag from '../../images/header-icons/shopping-bag.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const navVariants = {
    opened:{
        opacity:1,
    },
    closed:{
        opacity:0,
    }
}
const headerVariants={
    opened:(screenWidth)=>{
        if(screenWidth > 1024){
            return {
                gridTemplateColumns:'auto 0fr 1fr 0px 128px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
        else{
            return {
                gridTemplateColumns:'auto 0fr 1.5fr 0px 128px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
    },
    closed:()=>{
        // if(screenWidth > 1024){
            return {
                gridTemplateColumns:'auto 4fr 1fr 70px 0px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }
        }
    //     else{
    //         return {
    //             gridTemplateColumns:'auto 0fr 1.5fr 0px 108px',
    //             transition:{
    //                 duration:0.8,
    //                 ease:[0.76, 0, 0.24, 1]
    //             }
    //         }
    //     }
    // }
}

const ButtomHeader = () => {
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const {cartQuantity} = useSelector(state=>state.cartReducer)
    const widthTriger = window.screen.availWidth;
    const searchRef = useRef();
    return (
        <div className={styles.header}>
            <motion.div
             animate={isSearchOpen?'opened':{
                gridTemplateColumns:'auto 4fr 1fr 70px 0px',
                transition:{
                    duration:0.8,
                    ease:[0.76, 0, 0.24, 1]
                }
            }}
            variants={headerVariants}
            custom={widthTriger}
             className={styles.content}>
                <div className={styles.logo}>
                    <Link to={`/`}>
                        <h1>SNEAKERS</h1>
                    </Link>
                </div>
                <motion.ul
                    className={styles.nav}
                    initial={false}
                    animate={isSearchOpen?'closed':'opened'}
                    variants={navVariants}
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
                    animate={isSearchOpen?{
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
                >
                    <motion.div
                        className={styles.search}
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
                    // initial={false}
                    // animate={isSearchOpen?{
                    //     width:128,
                    //     transition:{
                    //         duration:0.4,
                    //         delay:0.3,
                    //     }
                    // }:{
                    //     width:0,
                    //     transition:{
                    //         duration:0.4,
                    //     }
                    // }}
                    onClick={()=>setIsSearchOpen(false)}
                >Cancel</motion.button>
            </motion.div>
        </div>
    );
};


export default ButtomHeader;