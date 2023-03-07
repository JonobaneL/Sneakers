import React, {useState} from 'react';
import shopingBag from '../../../images/dark-icons/shopping-bag.png'
import user from '../../../images/dark-icons/user.png'
import searchIcon from '../../../images/dark-icons/search-icon.png'
import styles from './Header.module.scss'
import SInput from '../input/SInput';
import BurgerNav from '../burgerMenu/burgerNav';
import BurgerButton from '../burgerButton/BurgerButton';
import { Link } from 'react-router-dom';

const Header = () => {

    const [burger, setBurger] = useState(false);
    const showBurgerNav =()=>{
      setBurger(!burger)
    }
    return (
        <header className={styles.header}>
          <div className={styles.content}>
          <BurgerButton show={showBurgerNav} />
            <div className={styles.logo}>
              <h1>SNEAKERS</h1>
            </div>
            <nav className={styles.nav}>
              <div className={styles.topNav}>
                <ul className={styles.list}>
                  <li className={styles.topItem}>
                      <SInput height="30px" params={{type:"text",placeholder:"Find Something Special"}}/>
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
                  <li className={styles.bottomItem}><Link to={`/shoes/men`}>Men</Link></li>
                  <li className={styles.bottomItem}><Link to={`/shoes/women`}>Women</Link></li>
                  <li className={styles.bottomItem}><Link to={`/shoes/accessories`}>Accessories</Link></li>
                  <li className={styles.bottomItem}><Link to={`/shoes/sale`}>Sale</Link></li>
                </ul>
              </div>
            </nav>
          </div>
            <BurgerNav visible={burger}/>
        </header>
    );
};

export default Header;