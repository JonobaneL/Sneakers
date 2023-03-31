import React,{useState} from "react";
import styles from './Gallery.module.scss'

const Gallery = ({images,width}) => {
    const [selectedSlide,setSelected] = useState(0)
    return ( 
        <div className={styles.gallery} style={{width:`${width}px`,height:`${width-80}px`}}>
            <div className={styles["gallery-navigation"]}>
                {images.map((item,index)=>
                <div 
                    key={index} 
                    className={`${styles.nav__item} ${selectedSlide == index?styles.active:''}`}
                    onClick={e=>{
                        setSelected(e.target.dataset.navid)}}
                    >
                    <img data-navid={index}  src={item} alt={`slide${index}`} />
                </div>
                )}
            </div>
            <div className={styles.slides}>
                {images.map((item,index)=>
                    <div key={index} className={`${styles.slide} ${selectedSlide == index?styles.active:''}`}>
                        <img src={item} alt={`slide${index}`} />
                    </div>
                    )}
            </div>
        </div> 
    );
}
 
export default Gallery;