import React, { useState } from 'react';
import styles from './ButtomHeader.module.scss'
import searchIcon from '../../images/header-icons/search-icon.svg'
import favoritesIcon from '../../images/header-icons/favorites.svg'
import shoppingBag from '../../images/header-icons/shopping-bag.png';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerButton from '../UI/burgerButton/BurgerButton';
import { useAsync } from '../../hooks/useAsync';
import { useAuth } from '../../context/AuthContext';
import { getCurrentUser } from '../../firebase/fireAuthAPI';
import {headerVariants, logoVarints, navVariants, searchWrapperVariants, searchVariants} from '../../utils/buttomHeaderVariants'
import { getCategories } from '../../firebase/productFirebaseAPI';
import { searchEngine } from '../../utils/searchEngine';

const ButtomHeader = () => {
    const [isSearchOpen,setIsSearchOpen] = useState(false);
    const [burgerMenu,setBurgerMenu] = useState(false);
    const {cartQuantity} = useSelector(state=>state.cartReducer)
    const { currentUser } = useAuth();
    const [,,userInfo] = useAsync(()=>getCurrentUser(currentUser.uid),[],'firebase')

    const widthTriger = window.screen.availWidth;
    const [searchQuery,setSearchQuery] = useState('');
    const searchResults = searchEngine(searchQuery)
    const navigate = useNavigate()
     
    return (
        <div className={styles.header}>
            <motion.div
                animate={isSearchOpen?'opened':'closed'}
                variants={headerVariants}
                custom={widthTriger}
                className={styles.content}
            >
                <motion.div 
                    className={styles.logo}
                    initial={false}
                    animate={!isSearchOpen?'visible':'hidden'}
                    variants={logoVarints}
                    custom={widthTriger}
                >
                    <Link to={`/`}>
                        <h1>SNEAKERS</h1>
                    </Link>
                </motion.div>
                <motion.ul
                    className={styles.nav}
                    initial={false}
                    animate={!isSearchOpen?'visible':'hidden'}
                    variants={navVariants}
                >
                    <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                    <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                    <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                </motion.ul>

                <motion.div 
                    className={styles["search-wrapper"]}
                    initial={false}
                    animate={isSearchOpen?'opened':'closed'}
                    variants={searchWrapperVariants}
                    custom={widthTriger}
                >
                    <motion.div
                        className={styles.search}
                        initial={false}
                        animate={isSearchOpen?'opened':'closed'}
                        variants={searchVariants}
                        custom={widthTriger}
                    >
                        <button className={styles.search__btn} onClick={()=>setIsSearchOpen(true)}>
                            <img src={searchIcon} alt="search" />
                        </button>
                        <input  
                            className={styles.search__field} 
                            type="text" 
                            placeholder='Search...'
                            value={searchQuery}
                            onChange={e=>setSearchQuery(e.target.value)}
                            onFocus={()=>setIsSearchOpen(true)} 
                            />
                    </motion.div>
                </motion.div>

                <motion.div
                    className={styles['button-nav']}
                    initial={false}
                    animate={!isSearchOpen?{
                        marginLeft:'10px',
                    }:{
                        marginLeft:'0', 
                    }}
                    transition={{
                        duration:0.8
                    }}
                >
                    {
                        (widthTriger >= 1024)&&<Link to='/user-profile/favorites' className={styles.favorites}>
                        <img src={favoritesIcon} alt="favoritesIcon" />
                    </Link>
                    }
                    
                    <Link to={'/shopping-cart'}>
                        <div className={styles.bag}>
                            <img src={shoppingBag} alt="shopping-bag" />
                            {cartQuantity==0?null:<div className={styles['cart-quantity']}>{cartQuantity}</div>}
                        </div>
                    </Link>
                   
                    <BurgerButton onChange={setBurgerMenu} />
                    <BurgerMenu user={userInfo} isOpen={burgerMenu} closeHandler={setBurgerMenu}/>
                </motion.div>

                <button
                    className={styles.cancel}
                    onClick={()=>setIsSearchOpen(false)}
                >Cancel</button>
            </motion.div>
            <div className={`${styles["search-results"]} ${(isSearchOpen && searchQuery.length>0)?styles.active:''}`}>
                <div className={styles['search-content']}>
                    <div className={styles.categories}>
                        <div className={styles.title}>
                            Search by category
                        </div>
                        <div className={styles['category-list']}>
                            {
                                searchResults.map(item=>{
                                    if(item.parent===null){
                                        return <div onClick={()=>navigate({
                                            pathname: '/shoes/men',
                                            search: `?category=${item.name}`,
                                          })} className={styles.list__item} key={item.id}>{item.name}</div>
                                    }
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};


export default ButtomHeader;