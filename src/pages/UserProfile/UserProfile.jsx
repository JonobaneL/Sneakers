import React from 'react';
import styles from './UserProfile.module.scss'
import { useAuth } from '../../context/AuthContext';
import { Outlet, useNavigate,NavLink } from 'react-router-dom';
import userIconD from '../../images/header-icons/user-icon.svg'
import userIconW from '../../images/user-iconw.svg'
import heartIconD from '../../images/heart-icon.svg'
import heartIconW from '../../images/heart-iconw.svg'
import listIconD from '../../images/list-icon.svg'
import listIconW from '../../images/list-iconw.svg'
import logOutIcon from '../../images/log-out-icon.svg'
import { clearCartAction } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';


const setActiveLink = ({isActive})=> isActive?styles.active:''

const UserProfile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleLogout = async()=>{
        try{
            await logout();
            dispatch(clearCartAction());
            navigate('/log-in')
        }catch (err){
            console.log(err)
        }
    }
    return (
        <div className={styles.profile}>
            <div className={styles.content}>
                <div className={styles.tabs}>
                    <div className={styles.nav}>
                        <NavLink 
                            className={setActiveLink}
                            to='info'
                        >
                            <p>Profile</p>
                            <img className={styles['dark-icon']} src={userIconD} alt="info" />
                            <img className={styles['white-icon']} src={userIconW} alt="info" />
                        </NavLink>
                        <NavLink 
                            className={setActiveLink}
                            to='orders'
                        >
                            <p>Orders </p>
                            <img className={styles['dark-icon']} src={listIconD} alt="orders" />
                            <img className={styles['white-icon']} src={listIconW} alt="orders" />
                        </NavLink>
                        <NavLink 
                            className={setActiveLink}
                            to='favorites'
                        >
                            <p>Favorites</p>
                            <img className={styles['dark-icon']} src={heartIconD} alt="favorites" />
                            <img className={styles['white-icon']} src={heartIconW} alt="favorites" />
                        </NavLink>
                    
                        <div 
                            className={styles.nav__item}
                            onClick={handleLogout}
                        >
                            <p>Log Out</p>
                            <img className={styles['dark-icon']} src={logOutIcon} alt="log-out" />
                        </div>
                    </div>
                    <div className={styles.tab}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default UserProfile;