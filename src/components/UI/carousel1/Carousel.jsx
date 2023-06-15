import React, { useState } from 'react';
import styles from './Carousel.module.scss'
import waveDesktop from '../../../images/wave-desktop.svg'
import waveMobile from '../../../images/wave-mobile.svg'
import { AnimatePresence, wrap,motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
const Carousel = ({data,dots=true}) => {
   
    const [page,setPage]=useState(0)
    const pageIndex = wrap(0,data.length,page);

    const dotsPaginate = dotIndex =>{
        setPage(dotIndex)
    }
    const itemVariants = {
        enter: {
              opacity: 0
          },
          center: {
            opacity: 1
          },
          exit:{
              opacity: 0
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
    const windowWidth = window.innerWidth;
    const backgroundImage = windowWidth<=450?waveMobile:waveDesktop
    console.log(windowWidth)
    return (
        <div className={styles.carousel}>
            <img src={backgroundImage} className={styles.background} alt="" />
            <div className={styles.content}>
                <AnimatePresence initial={false} mode='wait'>
                    <motion.div 
                    key={page}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={itemVariants}
                    transition={{
                        opacity: { duration: 0.2 },
                        when:'beforeChildren'
                    }}
                    className={styles.carousel_item}>
                        <div className={styles.title}>
                            <motion.p
                                variants={infoVariants}
                                initial="hidden"
                                animate="visible"
                                custom={0}
                                className={styles.title__season}>{data[pageIndex].season}</motion.p>
                            <motion.p
                                initial="hidden"
                                animate="visible"
                                custom={1}
                                variants={infoVariants}
                                className={styles.title__head}>{data[pageIndex].title}</motion.p>
                            <motion.p
                               initial="hidden"
                               animate="visible"
                                variants={infoVariants}
                                custom={2}
                                className={styles.title__description}>{data[pageIndex].description}</motion.p>
                            <Link to={data[pageIndex].link}>
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={infoVariants}
                                    custom={3}
                                    className={styles.discover}
                                    >
                                        <Button width='100%' height='100%' type='primary'>discover now</Button>
                                </motion.div>
                            </Link>
                        </div>
                        <motion.div
                            initial='start'
                            animate='done'
                            variants={imageVariants}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30,duration:1},
                            }}
                            className={styles.image}>
                                <img  src={data[pageIndex].img} alt="" />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
                {
                    dots&&<div className={styles.dots_nav}>
                        {data.map((_,index)=>
                            <motion.div
                            key={index}
                            className={`${styles.dot} ${pageIndex===index?styles.active:''}`}
                            onClick={()=>dotsPaginate(index)}
                        ></motion.div>
                        )}
                    </div>
                }
            </div>
                
        </div>
    );
};

export default Carousel;