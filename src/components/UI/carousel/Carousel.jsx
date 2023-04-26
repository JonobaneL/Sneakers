import React, { useState } from 'react';
import styles from './Carousel.module.scss'
import titleStyles from './carousel-title.module.css'
import { Link } from 'react-router-dom';

const Carousel = ({data}) => {
    const [selectedItemID,setSelectedItemID] = useState(data[0].id)
    return (
        <div className={styles.carousel}>
            <div className={styles.content}>
            {data.map(item=>
                <div key={item.id} className={`${styles.item} ${selectedItemID === item.id?styles.active:''}`}>
                    <div className={styles.title}>
                        <p className={styles.title__season}>{item.season}</p>
                        <p className={styles.title__head}>{item.title}</p>
                        <p className={styles.title__description}>{item.description}</p>
                        <button className={styles.discover}><Link to={item.link}>discover now</Link></button>
                    </div>
                    <div className={styles.image}>
                        <div className={styles.scelet}>
                            <img  src={item.img} alt="" />
                        </div>
                    </div>
                </div>
                )}
                <div className={styles.dots}>
                    {data.map(item=>
                        <div 
                            key={item.id} 
                            className={`${styles.dot} ${selectedItemID === item.id?styles.active:''}`}
                            onClick={()=>setSelectedItemID(item.id)}
                            ></div>
                    )}
                   
                </div>  
                <div className={styles.circle}></div>
            </div>
        </div>
    );
};


export default Carousel;