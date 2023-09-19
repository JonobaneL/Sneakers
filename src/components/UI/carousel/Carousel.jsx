import React, { useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.scss'
import rigthArrow from '../../../images/right-arrow.svg'

const Carousel = ({children,cardWidth=150,cardGap=10,cardsToShow=5}) => {
    const [itemsToShow,setItemsToShow] = useState(cardsToShow);
    const itemsAmount = children.length;
    const minItems = 1;
    const wrapperRef = useRef();
    const [carouselPosition,setCarouselPosition] = useState(0)
    useEffect(()=>{
        const temWidth = wrapperRef.current?.offsetWidth;
        const wrapperWidth = itemsToShow*(cardWidth+cardGap)-cardGap;
        if(temWidth<wrapperWidth){
            const currentWidth = Math.max(Math.floor((temWidth-60)/(cardWidth+cardGap)),minItems);
            console.log(temWidth,cardWidth)
            console.log(Math.floor(temWidth/(cardWidth+cardGap)))
            setItemsToShow(currentWidth)
        }
    },[])
    const leftArrowHandler = ()=>{
        if(carouselPosition>0){
            setCarouselPosition(prev=>prev-(cardWidth+cardGap))
        }
    }
    const rightArrowHandler = ()=>{
        const tempTriger = (itemsAmount-itemsToShow)*(cardWidth+cardGap)
        if(carouselPosition<tempTriger){
            setCarouselPosition(prev=>prev+(cardWidth+cardGap))
        }
    }
    return (
        <div ref={wrapperRef} className={styles.content}>
            <button className={`${styles.arrow} ${styles.left}`}
                onClick={leftArrowHandler}
            >
                <img src={rigthArrow} alt="right arrow" />
            </button>
            <div  className={styles.wrapper}
                style={{
                    width:`${itemsToShow*(cardWidth+cardGap)-cardGap}px`
                }}
            >
                <div className={styles.carousel}
                    style={{
                        translate:`${-1*(carouselPosition)}px`,
                        gap:`${cardGap}px`
                    }}
                >
                   {children.map((item,index)=><div key={index} className='item-wrapper' style={{width:cardWidth}}>
                    {item}
                   </div>)}
                </div>
            </div>
            <button className={`${styles.arrow} ${styles.right}`}
                onClick={rightArrowHandler}
            >
                <img src={rigthArrow} alt="right arrow" />
            </button>
            
            
        </div>
    );
};

export default Carousel;