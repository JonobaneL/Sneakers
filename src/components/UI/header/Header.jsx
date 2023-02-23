import React from 'react';
import logo from '../../../images/logo.png'
import shopingBag from '../../../images/shopping-bag.png'
import user from '../../../images/user.png'
import searchIcon from '../../../images/magnifying-glass.png'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.topHeader}>
              <div className={styles.content}>
                <div className={styles.search}>
                  <img src={searchIcon} alt="search" />
                </div>
                <img className={styles.bag} src={shopingBag} alt="shoping bag" />
                <img className={styles.bag} src={user} alt="user" />
              </div>
            </div>
            <div className={styles.bottomHeader}>
              <div className={styles.content}>
                <img className={styles.logo} src={logo} alt="logo" />
                <ul className={styles.menu}>
                  <li className={styles.menu__item}>Men</li>
                  <li className={styles.menu__item}>Women</li>
                  <li className={styles.menu__item}>Accessories</li>
                </ul>  
              </div>
            </div>
        </header>
    );
};


export default Header;