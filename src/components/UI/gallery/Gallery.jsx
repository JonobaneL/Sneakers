import React,{useRef, useState} from "react";
import styles from './Gallery.module.scss'
import { AnimatePresence,motion,wrap } from 'framer-motion'
import arrowIcon from '../../../images/back-icon.svg'

const Gallery = ({images}) => {
    const [selected,setSelected] = useState(0);
    const pageIndex = wrap(0,images.length,selected);

    const paginate= index =>{
        setSelected(p=>p+index)
    }
    const galleryVariant = {
        hidden:{
            opacity:0,
        },
        visible:{
            opacity:1,
        }
    }
    return ( 
        <div className={styles['gallery-wrapper']}>
            <ul className={styles.nav}>
                {
                    images.map((item,index)=>{
                        return <li 
                            key={index} 
                            className={`${styles.nav__item} ${pageIndex==index?styles.active:''}`}
                            onClick={()=>setSelected(index)}
                        >
                            <img src={item} alt={`nav-item-${index}`} />
                        </li>
                    })
                }
            </ul>
            <button 
                onClick={()=>paginate(-1)}
                className={`${styles.arrow} ${styles.left}`}
            >
                {/* <img src={arrowIcon} alt="left-arrow" />  */}
                &#8249;
            </button>
            <div className={styles.gallery}>
                <AnimatePresence initial={false} mode='wait'>
                    <motion.img 
                        key={pageIndex}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        variants={galleryVariant}
                        transition={{
                            opacity: { duration: 0.15 }
                        }}
                        className={styles.gallery__item}
                        src={images[pageIndex]} 
                        alt={`img-${pageIndex}`} 
                        />
                </AnimatePresence>
            </div>
            <button 
                onClick={()=>paginate(1)}
                className={`${styles.arrow} ${styles.right}`}
            >
                {/* <img src={arrowIcon} alt="right-arrow" />  */}
                &#8250;
            </button>
        </div>
    );
}
 
export default Gallery;
