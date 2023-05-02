import React from 'react';
import styles from './Slider.module.scss'
import { AnimatePresence,motion } from 'framer-motion';
import { useState } from 'react';
import { wrap } from 'framer-motion';

const Slider = ({data,children,arrows=false,dots=true}) => {
    console.log(children)
    const primarySliderStyles = {
        padding:`0 ${arrows?'50px':0} ${dots?'30px':0} ${arrows?'50px':0}`
    }
    const [[page,direction],setPage]=useState([0,0])
    const itemIndex = wrap(0,children.length,page)
    const paginate = newDirection=>{
        setPage([page+newDirection,newDirection])
    }
    const itemVariants = {
        enter: (direction) => {
            return {
              x: direction > 0 ? 500 : -500,
              opacity: 0
            };
          },
          center: {
            zIndex: 1,
            x: 0,
            opacity: 1
          },
          exit: (direction) => {
            return {
              zIndex: 0,
              x: direction < 0 ? 500 : -500,
              opacity: 0
            };
          }
    }
    const dotPaginate = dotIndex => {
        if(dotIndex<itemIndex){
            setPage([dotIndex,-1])
        }else if(dotIndex>itemIndex){
            setPage([dotIndex,1])
        }
    }
    return (
        <div className={styles.slider} style={primarySliderStyles}>
            <div className={styles.content}>
               <AnimatePresence initial={false} mode='wait' custom={direction}>
                <motion.div
                key={page}
                custom={direction}
                variants={itemVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30,duration:1 },
                    opacity: { duration: 0.2 }
                  }}
                className={styles.slide_item}>
                    {children[itemIndex]}
                </motion.div>
               </AnimatePresence>
            </div>
            {
                arrows&&<>
                    <button
                    onClick={()=>paginate(-1)}
                    className={styles.prev}
                    >&#8249;
                    </button>
                    <button
                        onClick={()=>paginate(1)}
                        className={styles.next}
                    >&#8250;
                    </button>
                </>
                
            }
            {
                dots && <div className={styles.dots_nav}>
                        {children.map((_,index)=>
                        <motion.div
                        key={index}
                        whileHover={{
                            background:"#1d2d44"
                        }}
                        animate={{background:itemIndex===index?'#1d2d44':'#a0a0a0'}}
                        className={styles.dot}
                        onClick={()=>dotPaginate(index)}
                        ></motion.div>
                        )}
                </div>
            }
           
        </div>
    );
};


export default Slider;