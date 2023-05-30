import { AnimatePresence,motion } from 'framer-motion';
import styles from './ProductsCarousel.module.scss'
import { bestSellers } from '../../data/homeSneakersData';
import { useState } from 'react';
import arrow from '../../images/right-arrow.svg'
import ShoesItem from '../productsListItem/ProductsItem';
import { itemsToShow } from '../../utils/itemsToShow';

const ProductCarousel = () => {
    //best sellers
    //newest
    const windowSize = window.screen.availWidth;
   
    const toScroll=1;
   const toShow =  itemsToShow()
    // >1280
    // const toShow = 5;

    //1280
    // const toShow = 4;
    //1024
    // const toShow = 4;
    //768
    // const toShow = 1;

        



    const [[start,end],setBorders] = useState([0,toShow]);
    const [direction,setDirection] = useState(0)
    const carouselVariants = {
        enter: direction=>{
            return {
                x: direction > 0 ? 200 : -200,
                opacity: 0
            }
        },
        ready:{
            x:0,
            opacity:1,
        },
        exit:direction=>{
            return {
                x: direction < 0 ? 200 : -200,
                opacity: 0
            }
        },
    }
    const paginate =(newDirection)=>{
        setBorders([start+(newDirection*toScroll),end+(newDirection*toScroll)]);
        setDirection(newDirection)
    }
    return ( 
        <div className={styles.wrapper}>
            <button className={`${styles.arrow} ${start<=0?styles.disabled:''}`} onClick={()=>paginate(-1)}>
                <img src={arrow} alt="prev" />
            </button>
            <motion.div className={styles.carousel} layout>
                <AnimatePresence initial={false} mode='popLayout' custom={direction}>
                    {
                        bestSellers.map((item,index)=>{
                            if(index>=start && index<end)
                            return (
                                <motion.div 
                                    key={item.id}
                                    layout
                                    custom={direction}
                                    className={styles.carousel__item}
                                    variants={carouselVariants}
                                    initial="enter"
                                    animate="ready"
                                    exit="exit"
                                    transition={{
                                        x: { type: "tween",duration:0.3 },
                                        opacity: { duration: 0.3 }
                                    }}
                                >
                                    {/* <img src={item.colors[0].images[0]} alt="" />
                                    <p>{item.name}{item.id}</p> */}
                                    <ShoesItem item={item}/>
                                </motion.div>
                            )
                        })
                    }
                </AnimatePresence>
            </motion.div>
            <button className={`${styles.arrow} ${end >= bestSellers.length?styles.disabled:''}`} onClick={()=>paginate(1)}>
                <img src={arrow} alt="next" />
            </button>
        </div>
     );
}
 
export default ProductCarousel;