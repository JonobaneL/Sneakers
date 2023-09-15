import React, { useState } from 'react';
import styles from './Header.module.scss'
import { Link } from 'react-router-dom';
import userIcon from '../../images/header-icons/user-icon.svg';
import DropDownMenu from '../UI/dropDownMenu/DropDownMenu';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { getCurrentUser } from '../../firebase/fireAuthAPI';
import { useDispatch } from 'react-redux';
import { clearCartAction, fetchShoppingCart } from '../../redux/cartSlice';
import { fetchFavorites } from '../../redux/favoritesSlice';
import ButtomHeader from '../ButtomHeader/ButtomHeader';
import { useAsync } from '../../hooks/useAsync';

const Header = () => {
    const [helpDropMenu,setHelpDropMenu] = useState(false)
    const [userDropMenu,setUserDropMenu] = useState(false)
    const dispatch = useDispatch();
    const {currentUser,logout} = useAuth();
    const [,,userInfo] = useAsync(()=>getCurrentUser(currentUser?.uid||'s'),[currentUser],'firebase')
    useEffect(()=>{
        if(currentUser){
            dispatch(fetchShoppingCart(currentUser.uid))
            dispatch(fetchFavorites(currentUser.uid))
        }
    },[currentUser])
    const handleLogout = async()=>{
        try{
            await logout();
            dispatch(clearCartAction())
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
                               <Link to='/user-profile/info'>Hi, {userInfo.firstName} 
                                    <img className={styles['user-icon']} src={userIcon} alt='user'/>
                               </Link> 
                                <DropDownMenu triger={userDropMenu}>
                                    <div className={styles['help-menu']}>
                                        <p className={styles.title}>Accont</p>
                                        <ul className={styles.menu}>
                                            <li><Link to='/user-profile/info'>Profile</Link></li>
                                            <li><Link to='/user-profile/orders'>Orders</Link></li>
                                            <li><Link to='/user-profile/favorites'>Favorites</Link></li>
                                            <li><Link to='/' onClick={handleLogout}>Log Out</Link></li>
                                        </ul>
                                    </div>
                                </DropDownMenu>
                            </li>
                        }
                        
                    </ul>
                </div>
            </div>
            <ButtomHeader />
        </div>
    );
};


export default Header;