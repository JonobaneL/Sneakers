import React,{useRef, useState} from "react";
import styles from './Gallery.module.scss'
import { AnimatePresence,motion,wrap } from 'framer-motion'
import arrowIcon from '../../../images/gallery-arrow.svg'

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
                <img src={arrowIcon} alt="left-arrow" className={styles.icon} /> 
            </button>
            <div className={styles.gallery}>
                 <motion.div className={styles.gallery__line} animate={{
                            x: `-${pageIndex * 100}%`,
                        }}
                        transition={{
                            x:{duration:0}
                        }}
                        >
                            {
                                images.map((item,index)=>{
                                    return <img 
                                        className={styles.gallery__item} 
                                        src={item} 
                                        alt={`nav-item-${index}`}
                                        key={index}
                                        loading="lazy"
                                        />
                                })
                            }
                        </motion.div>
            </div>
            <button 
                onClick={()=>paginate(1)}
                className={`${styles.arrow} ${styles.right}`}
            >
                <img src={arrowIcon} alt="left-arrow" className={styles.icon} /> 
            </button>
        </div>
    );
}
 
export default Gallery;
