import SInput from '../input/SInput';
import styles from './burgerNav.module.scss'
import searchIcon from '../../../images/dark-icons/search-icon.png'
const BurgerNav = () => {
    return <div className={styles.burgerNav}>
        <div className={styles.content}>
            <div className={styles.search}>
                <SInput type="text" placeholder="Find Something Special"/>
                <img src={searchIcon} alt="search" />
            </div>
            <ul className={styles.nav}>
                <li className={styles.navItem}>Men</li>
                <li className={styles.navItem}>Women</li>
                <li className={styles.navItem}>Accessories</li>
                <li className={styles.navItem}>Sale</li>
            </ul>
        </div>
    </div>;
}
 
export default BurgerNav;