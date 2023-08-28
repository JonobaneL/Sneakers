import React from 'react';
import ReactDom from 'react-dom'
import styles from './SearchResults.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { searchEngine } from '../../utils/searchEngine';
import { useNavigate } from 'react-router-dom';

const resultsVariants = {
    hidden:{
        y:-100,
        opacity:0,
        transition:{
            delay:0,
            duration:0.4,
            ease:[0.76, 0, 0.24, 1]
        }
    },
    visible:{
        y:0,
        opacity:1,
        transition:{
            delay:0.5,
            duration:0.4,
            ease:[0.76, 0, 0.24, 1]
        }
    }
}
const wrapperVariants = {
    enter:{
        backdropFilter: 'blur(4px)',
        transition:{
            delay:0.5,
            duration:0.6,
            ease:[0.76, 0, 0.24, 1]
        }
    },
    exit:{
        backdropFilter:'blur(0)',
        transition:{
            delay:0,
            duration:0.6,
            ease:[0.76, 0, 0.24, 1]
        }
    }
}

const SearchResults = ({isOpen,onChange,query,onChangeQuery}) => {
    const categoriesResult = searchEngine(query)
    const navigate = useNavigate()
    const wrapperHandler=()=>{
        onChangeQuery('')
        onChange(false)
    }    
    
    return ReactDom.createPortal(
        <AnimatePresence initial={false}>
            {
                (isOpen && query.length > 0)&&<motion.div
                    initial='exit'
                    animate="enter"
                    exit='exit'
                    variants={wrapperVariants}
                    transition={{
                        delay:0.5,
                        duration:0.6,
                        ease:[0.76, 0, 0.24, 1]
                    }}
                    className={styles.wrapper}
                    onClick={wrapperHandler}
                    >
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={resultsVariants}
                        className={styles["search-results"]}
                        onClick={e=>e.stopPropagation()}
                    >
                        <div className={styles.content}>
                            <div className={styles.categories}>
                                <div className={styles.title}>
                                    Search by category
                                </div>
                                <div className={styles['category-list']}>
                                    {
                                        categoriesResult.map(item=>{
                                            if(item.parent===null){
                                                return <div onClick={()=>{
                                                    navigate({ pathname: '/shoes/men', search: `?category=${item.name}`});
                                                    onChange(false)
                                                }
                                            } 
                                                className={styles.list__item} key={item.id}>{item.name}</div>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        

                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
        
        ,document.getElementById('searchResults')
    )
};


export default SearchResults;