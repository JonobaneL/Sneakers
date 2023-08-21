import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';
import RadioButton from '../components/UI/radioButton/RadioButton';
import searchIcon from '../images/header-icons/search-icon.svg'
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
const About = () => {
    const searchRef = useRef('')
    const [isOpen,setIsOpen] = useState(false)
    const searchAnimate = {

    }
    const searchInitial = {
        
    }
    return <div className={styles.about}>
        <div className={styles.content} >
            
            {/* <motion.div
            layout
            className={styles.header}>
                <div className={styles.logo}>SNEAKERS</div>
                    <motion.ul 
                        animate={isOpen?navVariants:initialNav}
                        layout
                        transition={{
                           duration:1 
                        }}
                        className={styles.nav}>
                        <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                        <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                        <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                        <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                        <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                    </motion.ul>
                
                
                <motion.div
                initial={{
                    display:'flex',
                    justifyContent:'center'
                }}
                animate={isOpen?{
                    width:'100%',
                }:{
                    width:'fit-content'
                }}
                   
                >
                <motion.div 
                animate={!isOpen?initialSearch:searchVariants}
                transition={{
                    duration:1,
                }}
                   className={styles["search-wrapper"]}
                   onClick={()=>setIsOpen(true)}
               >
                   <button className={styles.search__btn} onClick={()=>controls.start(searchVariants)}>
                       <img src={searchIcon} alt="search" />
                   </button>
                   <input onFocus={()=>setIsOpen(true)} className={styles.search__field} ref={searchRef} type="text" placeholder='Search...' />
               </motion.div>

                </motion.div>
                
                <AnimatePresence>
                    {
                        !isOpen ?<motion.div 
                            initial={{
                                opacity:1,
                            }}
                            exit={{
                                opacity:0,
                            }}
                            className={styles["button-bar"]}>
                            <button></button>
                            <button></button>
                        </motion.div>
                        :<motion.button
                        initial={{
                            opactiy:1
                        }}
                        animaty={{
                            opacity:0
                        }}
                        exit={{
                            opacity:1
                        }}
                            onClick={()=>setIsOpen(false)}
                            className={styles.cancel}>
                            Cancel
                        </motion.button>
                    }
                </AnimatePresence>
            </motion.div> */}
            <button onClick={()=>setIsOpen(p=>!p)}>Open</button>
            <br/>

           
            <div className={styles.header}>
            {/* <div style={{
                width:'130px',
                height:'60px',
                background:'gray',
                flex:'1 0 auto'
            }} /> */}
            <div className={styles.logo}>SNEAKERS</div>
            <motion.ul
            className={styles.nav}
                initial={{
                    height:60,
                    width:'100%',
                    transition:{
                        duration:0.4,
                    }
                }}
                animate={!isOpen?{
                    width:'100%',
                    transition:{
                        duration:0.4,
                        delay:0.3,
                    }
                }:{
                    width:0,
                    transition:{
                        duration:0.4,
                    }
                }}
                >
                    <li className={styles.nav__item}><Link to={`/shoes/men`}> Men</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/women`}> Women</Link></li>
                    <li className={styles.nav__item}><Link to={`/shoes/kids`}> Kids</Link></li>
                    <li className={styles.nav__item}><Link to={`/accessories`}> Accessories</Link></li>
                    <li className={styles.nav__item}><Link to={`/sale`}> Sale</Link></li>
                </motion.ul>
            <motion.div className="wrapper"
                initial={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    height:60,
                    width:'20%',
                }}
                animate={isOpen?{
                    width:'100%',
                    transition:{
                        duration:0.4,
                    }
                }:{
                    width:'20%',
                    transition:{
                        duration:0.4,
                        delay:0.3
                    }
                }}
            >
                <motion.div
                initial={{
                    background:'blue',
                    width:'12rem',
                    height:60,
                }}
                animate={isOpen?{
                    width:'20rem',
                    transition:{
                        duration:0.5,
                        delay:0.5
                    }
                }:{
                    width:'12rem',
                    transition:{
                        duration:0.2,
                    }
                }}
                
                />
            </motion.div>
                <motion.div
                        initial={{
                            background:'black',
                            height:60,
                            flex:'1 0 auto',
                            width:'60px',
                            transition:{
                                duration:0.4,
                            }
                        }}
                        animate={!isOpen?{
                            width:'60px',
                            transition:{
                                duration:0.4,
                                delay:0.3,
                            }
                        }:{
                            width:0,
                            transition:{
                                duration:0.4,
                            }
                        }}

                ></motion.div>
                <motion.div
                        initial={{
                            background:'blueviolet',
                            height:60,
                            width:'70px',
                            flex:'1 0 auto',
                            transition:{
                                duration:0.4,
                            }
                        }}
                        animate={isOpen?{
                            width:'70px',
                            transition:{
                                duration:0.4,
                                delay:0.3,
                            }
                        }:{
                            width:0,
                            transition:{
                                duration:0.4,
                            }
                        }}

                ></motion.div>
            {/* <motion.div
                initial={{
                    border:'1px solid green',
                    height:60,
                    width:'100%',
                }}
                
            className="section">
            </motion.div> */}
            </div>
        </div>
    </div>;
}
 
export default About;