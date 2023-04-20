import React,{useRef, useState} from "react";
import styles from './Gallery.module.scss'
import { useEffect } from "react";

const Gallery = ({images,width}) => {
    const [selectedSlide,setSelected] = useState(0)
    const slideRef = useRef({});
   
    return ( 
        <div className={styles.gallery} >
            <div className={styles["gallery-navigation"]}>
                {images.map((item,index)=>
                <div 
                    key={index} 
                    data-navid={index}
                    className={`${styles.nav__item} ${selectedSlide == index?styles.active:''}`}
                    onClick={e=>{
                        setSelected(e.target.dataset.navid)}}
                    >
                    <img data-navid={index}  src={item} alt={`slide${index}`} />
                </div>
                )}
            </div>
            <div className={styles.slides} ref={slideRef}>
                <img src={images[0]} className={styles.defaultSet} />
                {images.map((item,index)=>
                        <img src={item} data-j={index} alt={`slide${index}`} key={index} className={`${styles.slide} ${selectedSlide == index?styles.active:''}`}/>
                    )}
            </div>
        </div> 
    );
}
 
export default Gallery;
