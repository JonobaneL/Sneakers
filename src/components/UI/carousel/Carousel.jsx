import React, { useState } from 'react';
import styles from './Carousel.module.scss'
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const Carousel = ({data}) => {
    const [selectedItemID,setSelectedItemID] = useState(data[0].id)
    const [triger,setTriger] = useState(true)
    return (
        <div className={styles.carousel}>
            <div className={styles.content}>
            {data.map(item=>
            <SwitchTransition key={item.id} mode="out-in">
                <CSSTransition 
                key={triger}
                timeout={500}
                classNames={{
                    enterActive: styles["item-enter-active"],
                    enterDone: styles["item-enter-done"],
                    exitActive: styles["item-exit-active"],
                    exitDone: styles["item-exit-done"],
                }}
                >
                    <div  className={`${styles.item} ${selectedItemID === item.id?styles.active:''}`}>
                        <div className={styles.title}>
                            <p className={styles.title__season}>{item.season}</p>
                            <p className={styles.title__head}>{item.title}</p>
                            <p className={styles.title__description}>{item.description}</p>
                            <Link to={item.link}><button className={styles.discover}>discover now</button></Link>
                        </div>
                        <div className={styles.image}>
                            <div className={styles.scelet}>
                                <img  src={item.img} alt="" />
                            </div>
                        </div>
                    </div>
                </CSSTransition>
            </SwitchTransition>
                )}
                <div className={styles.dots}>
                    {data.map(item=>
                        <div 
                            key={item.id} 
                            className={`${styles.dot} ${selectedItemID === item.id?styles.active:''}`}
                            onClick={()=>{setSelectedItemID(item.id);setTriger(p=>!p)}}
                            ></div>
                    )}
                   
                </div>  
                <div className={styles.circle}></div>
            </div>
        </div>
    );
};


export default Carousel;