import React, { useState } from 'react';
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import shoppingBag from '../../images/header-icons/shopping-bag.png';
import userIcon from '../../images/header-icons/user-icon.svg';
import favoritesIcon from '../../images/header-icons/favorites.svg'
import searchIcon from '../../images/header-icons/search-icon.svg'
import BurgerButton from '../UI/burgerButton/BurgerButton';
import { useShoppingCart } from '../../context/CartContext';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import DropDownMenu from '../UI/dropDownMenu/DropDownMenu';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { getCurrentUser } from '../../fireCloudAPI';

const Header = () => {
    const [isSearchOpen,setIsSearchOpen] = useState(false)
    const [burgerMenu,setBurgerMenu] = useState(false);
    const [helpDropMenu,setHelpDropMenu] = useState(false)
    const [userDropMenu,setUserDropMenu] = useState(false)
    const {cartQuantity} = useShoppingCart();
    const {currentUser,logout} = useAuth();
    const [details,setDetails] = useState({})
    const getUser = async()=>{
        try{
            const response = await getCurrentUser(currentUser.uid)
            setDetails(response.data())
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(currentUser){
            getUser()
        }
    },[currentUser])
    const handleLogout = async()=>{
        try{
            await logout();
            setUserDropMenu(false)
        }catch (err){
            console.log(err)
        }
    }
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles["header-top"]}>
                <div className={styles.content}>
                    <ul className={styles.nav}>
                        <li className={styles.nav__item} onMouseEnter={()=>setHelpDropMenu(true)} onMouseLeave={()=>setHelpDropMenu(false)}>
                            Help
                            <DropDownMenu triger={helpDropMenu}>
                                <div className={styles['help-menu']}>
                                    <p className={styles.title}>Help</p>
                                    <ul className={styles.menu}>
                                        <li><Link to='/shipping-returns'>Shipping & Returns</Link></li>
                                        <li><Link to='/payment-options'>Payment Options</Link></li>
                                        <li><Link to='/gift-cards'>Gift Cards</Link></li>
                                        <li><Link to='/size-charts'>Shoe Size Charts</Link></li>
                                        <li><Link to='/contact-us'>Contact Us</Link></li>
                                        <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                                    </ul>
                                </div>
                            </DropDownMenu>
                        </li>
                        <li className={`${styles.nav__item} ${styles.line}`}>|</li>
                        {
                            !currentUser && <>
                                <li className={styles.nav__item}><Link to='/sign-up'>Join Us</Link></li>
                                <li className={`${styles.nav__item} ${styles.line}`}>|</li>
                            </>
                        }
                        {
                            !currentUser && (
                            <li className={styles.nav__item}><Link to='/log-in'>Sign In</Link></li>
                            )
                        }
                        {
                            currentUser && <li 
                                className={styles.nav__item} 
                                onMouseEnter={()=>setUserDropMenu(true)} 
                                onMouseLeave={()=>setUserDropMenu(false)}
                            >
                               <Link to='/user-profile/info'>Hi, {details.firstName} 
                                    <img className={styles['user-icon']} src={userIcon} alt='user'/>
                               </Link> 
                                <DropDownMenu triger={userDropMenu}>
                                    <div className={styles['help-menu']}>
                                        <p className={styles.title}>Accont</p>
                                        <ul className={styles.menu}>
                                            <li><Link to='/user-profile/info'>Profile</Link></li>
                                            <li><Link to='/user-profile/orders'>Orders</Link></li>
                                            <li><Link to='/user-profile/favorites'>Favorites</Link></li>
                                            <li><p onClick={handleLogout}>Log Out</p></li>
                                        </ul>
                                    </div>
                                </DropDownMenu>
                            </li>
                        }
                        
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
                        <BurgerMenu user={details} isOpen={burgerMenu} closeHandler={setBurgerMenu}/>
                    </div>
                </div>
                
            </div>
        </div>
    );
};


export default Header;