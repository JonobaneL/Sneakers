import React from 'react';
import ReactDom from 'react-dom'
import styles from './SearchResults.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import { searchEngine } from '../../utils/searchEngine';
import { Link, useNavigate } from 'react-router-dom';
import { getFinalPrice } from '../../utils/getFinalPrice';

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
    if(isOpen) {
        document.body.style.overflowY='hidden'
    }else{
        document.body.style.overflowY='auto'
    }
    const [productsResult,categoriesResult] = searchEngine(query)
    const navigate = useNavigate()
    const wrapperHandler=()=>{
        onChangeQuery('')
        onChange(false)
    }    
    const titleEvent = (male,type)=>{
        return `${!male?'':male!=='kids'?`${male}'s`:`${male}'`} ${type}`
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
                            {
                               (productsResult.length>0)?<div className={styles.products}>
                                    {
                                        productsResult.map((item,index)=>{
                                            if(index<=4) {
                                                return <Link key={`${item.productID}/${item.modelID}`} to={`/product/${item.productID}/${item.modelID}`}>
                                                <div  className={styles.product}>
                                                    <img src={item.images[1]} alt={item.name} />
                                                    <p className={styles.name}>{item.name}</p>
                                                    <p className={styles.type}>{titleEvent(item.male,item.type)}</p>
                                                    <div className={styles.price}>
                                                        {(item.discount>0)?
                                                                <p className={styles.price__discount}>${getFinalPrice(item.price,item.discount)}</p>
                                                                : null
                                                        }
                                                        <p className={item.discount?styles.price__disabled:''}>${item.price}</p>

                                                    </div>
                                                </div>
                                                </Link>
                                            }
                                        })
                                    }
                                </div>
                                :categoriesResult.length===0?<div className={styles['warning-message']}>
                                    <span>No Results</span>
                                    <p>Try another words</p>
                                </div>
                                :null
                            }
                            
                            {
                                categoriesResult.length>0 && <div className={styles.categories}>
                                    <div className={styles.title}>
                                        Search by category
                                    </div>
                                    <div className={styles['category-list']}>
                                        {
                                            categoriesResult.map((item,index)=>{
                                                if(item.parent===null){
                                                    return <div onClick={()=>{
                                                        navigate({ pathname: `/shoes/men?category=${item.name}`});
                                                        onChange(false)
                                                    }
                                                } 
                                                    className={styles.list__item} data-index={index} key={item.id}>{item.name}</div>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            }
                            
                        </div>
                        

                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
        
        ,document.getElementById('searchResults')
    )
};


export default SearchResults;