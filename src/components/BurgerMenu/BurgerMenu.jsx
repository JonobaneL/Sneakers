import React, { useEffect } from 'react';
import ReactDom from 'react-dom'
import styles from './BurgerMenu.module.scss'
import { Link } from 'react-router-dom';
import shoppingBag from '../../images/dark-icons/shopping-bag.png';
import helpIcon from '../../images/help-icon.svg';
import { useShoppingCart } from '../../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

const BurgerMenu = ({isOpen,closeHandler}) => {
    if(!isOpen) {
        document.body.style.overflowY='unset'
    }else{
        document.body.style.overflowY='hidden'
    }
    const {cartQuantity} = useShoppingCart()
    const closeMenu = () =>{
        closeHandler(false)
    }
    const wrapperVariants = {
        enter:{
            background:'rgba(18, 18, 18, 0.36)',
            backdropFilter: 'blur(4px)'
        },
        exit:{
            backdropFilter:'blur(0)',
            background:'none',
        }
    }
    const menuVariants = {
        enter:{
            right:0,
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
                    transition={{
                        duration:0.2
                    }}
                    className={styles['burger-wrapper']}
                >
                    <motion.div 
                        initial='exit'
                        animate='enter'
                        exit='exit'
                        variants={menuVariants}
                        transition={{
                            duration:0.3,
                        }}
                        className={styles["burger-menu"]}
                    >
                        <button className={styles['close-btn']} onClick={closeMenu}></button>
                        <ul className={styles.nav}>
                            <li className={styles.nav__item}><Link to={`/shoes/men`} onClick={closeMenu}> Men</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/women`} onClick={closeMenu}> Women</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/kids`} onClick={closeMenu}> Kids</Link></li>
                            <li className={styles.nav__item}><Link to={`/accessories`} onClick={closeMenu}> Accessories</Link></li>
                            <li className={styles.nav__item}><Link to={`/sale`} onClick={closeMenu}> Sale</Link></li>
                        </ul>
                        <div className={styles.user}>
                            Become a Sneakers Member for the best products, inspiration.
                            <div className={styles["button-nav"]}>
                                <button className={styles['button-nav__item']}>Join Us</button>    
                                <button className={styles['button-nav__item']}>Sign In</button>    
                            </div> 
                        </div>
                        <div className={styles["additional-nav"]}>
                            <Link to={'/shopping-cart'}>
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
                            <Link to={'/'}>
                                <div className={styles['additional-nav__item']}>
                                    <img src={helpIcon} alt="help" />
                                    Help
                                </div>
                            </Link>
                        </div>
                    </motion.div>
            </motion.div>
                </>
            }
            
        </AnimatePresence>
        , document.getElementById('burgerMenu')
    );
};

export default BurgerMenu;