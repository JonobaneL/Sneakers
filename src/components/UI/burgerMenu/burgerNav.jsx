import SInput from '../input/SInput';
import styles from './burgerNav.module.scss'
import searchIcon from '../../../images/white-icons/search-icon.png'
import { Link } from 'react-router-dom';

const BurgerNav = ({visible,setVisible}) => {
    const rootClass = [styles.burgerNav]
    if(visible) rootClass.push(styles.active)
    return  <div className={rootClass.join(' ')}>
                <div className={styles.content}>
                    <div className={styles.search}>
                        <SInput type="text" placeholder="Find Something Special" theme="white"/>
                        <img src={searchIcon} alt="search" />
                    </div>
                    <ul className={styles.nav}>
                        <li><Link className={styles.navItem} to={`/shoes/men`} onClick={()=>setVisible(false)}>Men</Link></li>
                        <li><Link className={styles.navItem} to={`/shoes/women`} onClick={()=>setVisible(false)}>Women</Link></li>
                        <li><Link className={styles.navItem} to={`/shoes/accessories`} onClick={()=>setVisible(false)}>Accessories</Link></li>
                        <li><Link className={styles.navItem} to={`/shoes/sale`} onClick={()=>setVisible(false)}>Sale</Link></li>
                    </ul>
                </div>
            </div>;
}
 
export default BurgerNav;