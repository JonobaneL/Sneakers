import React, { useState } from 'react';
import ReactDom from 'react-dom'
import styles from './BurgerMenu.module.scss'
import { Link,useNavigate } from 'react-router-dom';
import shoppingBag from '../../images/header-icons/shopping-bag.png';
import favoritesIcon from '../../images/header-icons/favorites.svg';
import helpIcon from '../../images/help-icon.svg';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../UI/button/Button';
import { useAuth } from '../../context/AuthContext';
import userIcon from '../../images/header-icons/user-icon.svg';
import arrow from '../../images/right-arrow.svg';
import { useSelector } from 'react-redux';


const BurgerMenu = ({user,isOpen,closeHandler}) => {
    if(!isOpen) {
        document.body.style.overflowY='unset'
    }else{
        document.body.style.overflowY='hidden'
    }
    const {cartQuantity} = useSelector(state=>state.cartReducer)
    const {currentUser,logout} = useAuth();
    const [userMenu,setUserMenu] = useState(false)
    const [helpMenu,setHelpMenu] = useState(false)
    const navigate = useNavigate()

    const closeMenu = () =>{
        closeHandler(false);
        setUserMenu(false);
        setHelpMenu(false);
    }
    const wrapperVariants = {
        enter:{
            backdropFilter: 'blur(4px)'
        },
        exit:{
            backdropFilter:'blur(0)',
        }
    }
    const menuVariants = {
        enter:{
            right:0,
            // transition:{
            //     duration:0.8,
            //             ease:[0.76, 0, 0.24, 1]
            // }
        },
        exit:{
            right:-320,
        }
    }
    return ReactDom.createPortal(
        <AnimatePresence mode='sync'>
            {
                isOpen && <>
                <motion.div 
                    key='wrapper'
                    initial='exit'
                    animate="enter"
                    exit='exit'
                    variants={wrapperVariants}
                    className={styles['wrapper']}
                    onClick={closeMenu}
                >
                    <motion.div 
                        initial='exit'
                        animate='enter'
                        exit='exit'
                        variants={menuVariants}
                        transition={{
                            duration:0.6,
                            ease:[0.76, 0, 0.24, 1]
                        }}
                        className={styles["burger-menu"]}
                        onClick={e=>e.stopPropagation()}
                    >
                        
                        <button className={styles['close-btn']} onClick={closeMenu}></button>
                        {
                            currentUser &&(
                                <div className={styles.user} onClick={()=>setUserMenu(true)}>
                                    <img className={styles['user-icon']} src={userIcon} alt='user'/>
                                    <p className={styles['user-name']}>Hi, {user.firstName}</p>
                                    <img className={styles.arrow} src={arrow} alt='arrow'/>
                                </div>
                            )
                        }
                        
                        <ul className={styles.nav}>
                            <li className={styles.nav__item}><Link to={`/shoes/men`} onClick={closeMenu}> Men</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/women`} onClick={closeMenu}> Women</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/kids`} onClick={closeMenu}> Kids</Link></li>
                            <li className={styles.nav__item}><Link to={`/accessories`} onClick={closeMenu}> Accessories</Link></li>
                            <li className={styles.nav__item}><Link to={`/sale`} onClick={closeMenu}> Sale</Link></li>
                        </ul>
                        {
                            !currentUser &&(
                                <div className={styles['user-forms']}>
                                    Become a Sneakers Member for the best products, inspiration.
                                    <div className={styles["button-nav"]}>
                                            <Button mode='primary' width='50%' height='40px' onClick={()=>{
                                                closeMenu();
                                                navigate('/sign-up');
                                            }}
                                            >
                                                <span className={styles['button-nav__item']}>
                                                    Join Us
                                                </span>
                                            </Button> 
                                           
                                        <Button mode='secondary' width='50%' height='40px' onClick={()=>{
                                                closeMenu();
                                                navigate('/log-in')
                                            }}
                                            >
                                            <span className={styles['button-nav__item']}>
                                                Sign In
                                            </span>
                                        </Button>    
                                    </div> 
                                </div>
                            )
                        }
                        
                        <div className={styles["additional-nav"]}>
                            <Link to={'/shopping-cart'} onClick={closeMenu}>
                                <div className={styles['additional-nav__item']}>
                                    <img src={favoritesIcon} alt="favorites" />
                                    Favorites
                                </div>
                            </Link>
                            <Link to={'/shopping-cart'} onClick={closeMenu}>
                                <div className={styles['additional-nav__item']}>
                                    <img src={shoppingBag} alt="shopping-bag" />
                                    Bag
                                    {
                                        cartQuantity>0 &&<>
                                        <div className={styles['bag-quantity']}>
                                            {cartQuantity}
                                        </div>
                                        </>
                                    }
                                </div>
                            </Link>
                                <div className={styles['additional-nav__item']} onClick={()=>setHelpMenu(true)}>
                                    <img src={helpIcon} alt="help" />
                                    <p>Help</p>
                                    <img className={styles.arrow} src={arrow} alt='arrow'/>
                                </div>
                        </div>
                    </motion.div>
                    <AnimatePresence>
                        {
                            userMenu&&<motion.div 
                                initial='exit'
                                animate='enter'
                                exit='exit'
                                variants={menuVariants}
                                transition={{
                                    duration:0.3,
                                }}
                                className={styles["burger-menu"]}
                                onClick={e=>e.stopPropagation()}
                            >
                                <div className={styles.all} onClick={()=>setUserMenu(false)}>
                                    <img className={styles.arrow} src={arrow} alt='arrow'/>
                                    All
                                </div>
                            <ul className={styles.nav}>
                                    <li className={styles.nav__item}><Link to='/user-profile/info'onClick={closeMenu}> Profile</Link></li>
                                    <li className={styles.nav__item}><Link to='/user-profile/orders' onClick={closeMenu}> Orders</Link></li>
                                    <li className={styles.nav__item}><Link to='/user-profile/favorites' onClick={closeMenu}> Favorites</Link></li>
                                    <li className={styles.nav__item}><Link to='/' onClick={()=>{
                                        logout();
                                        closeMenu();
                                    }}
                                    > Log Out</Link></li>
                                </ul>
                            </motion.div>
                        }
                        {
                            helpMenu&&<motion.div 
                                initial='exit'
                                animate='enter'
                                exit='exit'
                                variants={menuVariants}
                                transition={{
                                    duration:0.3,
                                }}
                                className={styles["burger-menu"]}
                                onClick={e=>e.stopPropagation()}
                            >
                                <div className={styles.all} onClick={()=>setHelpMenu(false)}>
                                    <img className={styles.arrow} src={arrow} alt='arrow'/>
                                    All
                                </div>
                            <ul className={styles.nav}>
                                    <li className={styles.nav__item}><Link to='/shipping-returns' onClick={closeMenu}>Shipping & Returns</Link></li>
                                    <li className={styles.nav__item}><Link to='/payment-options' onClick={closeMenu}>Payment Options</Link></li>
                                    <li className={styles.nav__item}><Link to='/gift-cards' onClick={closeMenu}>Gift Cards</Link></li>
                                    <li className={styles.nav__item}><Link to='/size-charts' onClick={closeMenu}>Shoe Size Charts</Link></li>
                                    <li className={styles.nav__item}><Link to='/contact-us' onClick={closeMenu}>Contact Us</Link></li>
                                    <li className={styles.nav__item}><Link to='/privacy-policy' onClick={closeMenu}>Privacy Policy</Link></li>
                                </ul>
                            </motion.div>
                        }
                    </AnimatePresence>
                        
                    
                    
            </motion.div>
                </>
            }
            
        </AnimatePresence>
        , document.getElementById('burgerMenu')
    );
};

export default BurgerMenu;