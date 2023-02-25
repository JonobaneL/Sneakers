import React from 'react';
import shopingBag from '../../../images/dark-icons/shopping-bag.png'
import user from '../../../images/dark-icons/user.png'
import searchIcon from '../../../images/dark-icons/search-icon.png'
import styles from './Header.module.scss'
import SInput from '../input/SInput';

const Header = () => {
    return (
        <header className={styles.header}>
          <div className={styles.content}>
          <div className={styles.burger}>
              <span></span>
            </div>
            <div className={styles.logo}>
              <h1>SNEAKERS</h1>
            </div>
            
            <nav className={styles.nav}>
              <div className={styles.topNav}>
                <ul className={styles.list}>
                  <li className={styles.topItem}>
                      <SInput type="text" placeholder="Find Something Special"/>
                      <img src={searchIcon} alt="search" />
                  </li>
                  <li className={styles.topItem}>
                    <img src={shopingBag} alt="shoping-bag" />
                  </li>
                  <li className={styles.topItem}>
                    <img src={user} alt="user" />
                  </li>
                </ul>
              </div>
              <div className={styles.bottomNav}>
                <ul className={styles.list}>
                  <li className={styles.bottomItem}>Men</li>
                  <li className={styles.bottomItem}>Women</li>
                  <li className={styles.bottomItem}>Accessories</li>
                  <li className={styles.bottomItem}>Sale</li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
    );
};

export default Header;