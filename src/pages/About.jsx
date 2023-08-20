import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';
import RadioButton from '../components/UI/radioButton/RadioButton';
import searchIcon from '../images/header-icons/search-icon.svg'
import { Link } from 'react-router-dom';
const About = () => {
    const searchRef = useRef('')
    const [isOpen,setIsOpen] = useState(false)
    return <div className={styles.about}>
        <div className={styles.content} >
            <div className={`${styles.wrapper} ${isOpen?styles.active:''}`}>
                <div className={styles.b}/>
                <ul className={styles.nav}>
                    <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                    <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                    <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                </ul>
                <div className={`${styles["search-wrapper"]} ${isOpen?styles.active:''}`}>
                    <button className={styles.search__btn} onClick={()=>setIsOpen(true)}>
                        <img src={searchIcon} alt="search" />
                    </button>
                    <input onFocus={()=>setIsOpen(true)} className={styles.search__field} ref={searchRef} type="text" placeholder='Search...' />
                </div>
                <div className={styles["button-bar"]}>
                    <button></button>
                    <button></button>
                </div>
                <button
                    onClick={()=>setIsOpen(false)}
                    className={styles.cancel}>Cancel</button>
            </div>
            
            
        </div>
    </div>;
}
 
export default About;