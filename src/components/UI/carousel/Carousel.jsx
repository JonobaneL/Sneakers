import React, { useState } from 'react';
import styles from './Carousel.module.scss'
import { AnimatePresence, wrap,motion, AnimateSharedLayout } from 'framer-motion';
import { Link } from 'react-router-dom';
const Carousel = ({data,arrows=false,dots=true,children}) => {
    console.log(children)
   
    const [[page,direction],setPage]=useState([0,0])
    const pageIndex = wrap(0,children.length,page);
    const secondPage = wrap(0,children.length,page+1);
    const arrowsPaginate = newDirection =>{
        setPage([page+newDirection,newDirection])
    }
    const dotsPaginate = dotIndex =>{
        setPage([dotIndex,dotIndex<pageIndex?-1:1])
    }
    const itemVariants = {
        enter: (direction) => {
            return {
              x: direction > 0 ? 100 : -100,
              opacity: 0
            };
          },
          center: {
            // zIndex: 1,
            x: 0,
            opacity: 1
          },
          exit: (direction) => {
            return {
            //   zIndex: 0,
              x: direction < 0 ? 100 : -100,
              opacity: 0
            };
          }
    }
    const imageVariants ={
        start:{
            x: 20,
            opacity:0,
        },
        done:{
            x:0,
            opacity:1,
        }
    }
    const infoVariants = {
        hidden:{
            x:-20,
            opacity:0
        },
        visible:(index)=>{
            return{
                x:0,
                opacity:1,
                transition:{
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration:1,
                    delay:index*0.2
                }
            }
        }
    }
    return (
        <div className={styles.carousel}>
                <div className={styles.container}>
            <AnimatePresence initial={false} mode='wait' custom={direction}>
                    <motion.div 
                    key={page}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={itemVariants}
                    transition={{
                        opacity: { duration: 0.2 },
                        x: { type: "spring", stiffness: 300, damping: 30,duration:1},
                        when:'beforeChildren'
                    }}
                    className={styles.item}>
                        
                        {children[pageIndex]}
                    </motion.div>
                    
            </AnimatePresence>
            <AnimatePresence initial={false} mode='wait' custom={direction}>
                    <motion.div 
                    key={page}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={itemVariants}
                    transition={{
                        opacity: { duration: 0.2 },
                        x: { type: "spring", stiffness: 300, damping: 30,duration:1},
                        when:'beforeChildren'
                    }}
                    className={styles.item}>
                        
                        {children[secondPage]}
                    </motion.div>
                    
            </AnimatePresence>
            </div>

            <div onClick={()=>arrowsPaginate(-1)} className={styles.leftArrow}>&#60;</div>
            <div onClick={()=>arrowsPaginate(1)} className={styles.rightArrow}>&#62;</div>
            {
                dots&&<div className={styles.dots_nav}>
                    {data.map((_,index)=>
                        <motion.div
                        key={index}
                        imate={{boxShadow:pageIndex===index?'0px 0px 0px 2px #1d2d44':'0px 0px 0px 2px transparent'}}
                        className={`${styles.dot} ${pageIndex===index?styles.active:''}`}
                        onClick={()=>dotsPaginate(index)}
                    ></motion.div>
                    )}
                </div>
            }
            
        </div>
    );
};

export default Carousel;