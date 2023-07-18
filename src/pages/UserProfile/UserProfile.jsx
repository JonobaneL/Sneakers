import React from 'react';
import styles from './UserProfile.module.scss'
import { useAuth } from '../../context/AuthContext';
import { Outlet, useNavigate,NavLink } from 'react-router-dom';

const setActiveLink = ({isActive})=> isActive?styles.active:''

const UserProfile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()
    const handleLogout = async()=>{
        try{
            await logout();
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
                            Profile
                        </NavLink>
                        <NavLink 
                            className={setActiveLink}
                            to='orders'
                        >
                            Orders
                        </NavLink>
                        <NavLink 
                            className={setActiveLink}
                            to='favorites'
                        >
                            Favorites
                        </NavLink>
                    
                        <div 
                            className={styles.nav__item}
                            onClick={handleLogout}
                            >Log Out</div>
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