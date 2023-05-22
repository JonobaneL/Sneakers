import React, { useState } from 'react';
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import shoppingBag from '../../images/dark-icons/shopping-bag.png';
import favoritesIcon from '../../images/favorites.svg'
import searchIcon from '../../images/dark-icons/search-icon.png'
import BurgerButton from '../UI/burgerButton/BurgerButton';
import { useShoppingCart } from '../../context/CartContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { useToast } from '../../hooks/useToast';

const Header = () => {
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const [burgerMenu,setBurgerMenu] = useState(false);
    const {cartQuantity} = useShoppingCart();
    const {toasts} = useToast()
    console.log('hader',toasts)
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles["header-top"]}>
                <div className={styles.content}>
                    <ul className={styles.nav}>
                        <li className={styles.nav__item}>Help</li>
                        <li className={`${styles.nav__item} ${styles.line}`}>|</li>
                        <li className={styles.nav__item}>Join Us</li>
                        <li className={`${styles.nav__item} ${styles.line}`}>|</li>
                        <li className={styles.nav__item}>Sign In</li>
                    </ul>
                </div>
            </div>
            
            <div className={styles["header-bottom"]}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Link to={`/`}>
                            <h1>SNEAKERS</h1>
                        </Link>
                    </div>
                    { !isSearchOpen && <>
                        <ul className={styles.nav}>
                            <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                            <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                            <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                            <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                        </ul>
                    </>
                    }
                    
                    <div className={styles["button-nav"]}>
                        <div className={`${styles.search} ${isSearchOpen?styles.active:''}`}>
                            <button className={styles.search__btn} onClick={()=>setIsSearchOpen(true)}>
                                <img src={searchIcon} alt="search-icon" />
                            </button>
                            <input className={styles.search__field} type="text" placeholder='Search' />
                        </div>
                        {
                            !isSearchOpen ? <>
                            <Link to='/' className={styles.favorites}>
                                <img src={favoritesIcon} alt="favoritesIcon" />
                            </Link>
                            <Link to={'/shopping-cart'}>
                                <div className={styles.bag}>
                                    <img src={shoppingBag} alt="shopping-bag" />
                                    {cartQuantity==0?null:<div className={styles['cart-quantity']}>{cartQuantity}</div>}
                                </div>
                            </Link>
                            </>
                            :<>
                            <button className={styles.cancel_btn} onClick={()=>setIsSearchOpen(false)}>Cancel</button>
                            </>
                        }
                        <BurgerButton visible={burgerMenu} setVisible={setBurgerMenu} />
                        <BurgerMenu isOpen={burgerMenu} closeHandler={setBurgerMenu}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
};


export default Header;