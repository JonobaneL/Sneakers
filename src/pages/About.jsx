import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import rigthArrow from '../images/right-arrow.svg'
import { useAsync } from '../hooks/useAsync';
import useAllProducts from '../hooks/useAllProducts';
import { useProducts } from '../hooks/useProducts';
import Carousel from '../components/UI/carousel/Carousel';
const About = () => {
    const [option,setOption] = useState(0)
    const [itemsToShow,setItemsToShow] = useState(6);
    const itemsAmount = 12;
    const cardWidth = 150;
    const cardGap = 10;
    const minItems = 1;
    const wrapperRef = useRef();
    const [carouselPosition,setCarouselPosition] = useState(0)
    console.log(carouselPosition)
    useEffect(()=>{
        const temWidth = wrapperRef.current?.offsetWidth;
        const wrapperWidth = itemsToShow*(cardWidth+cardGap)-cardGap;
        if(temWidth<wrapperWidth){
            const currentWidth = Math.max(Math.floor(temWidth/(cardWidth+cardGap)),minItems);
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

    return <div className={styles.about}>
        <div className={styles.content} >
           
            <br />
            <br />
            <button 
                className={styles.btn}
                onClick={()=>{
                    console.log(wrapperRef.current?.offsetWidth )
                }}
            >Settings</button>
            <button 
                className={styles.btn}
                onClick={()=>{
                    
                }}
            >Prev</button>
            <button 
                className={styles.btn}
                onClick={()=>{
                   
                }}
            >Next</button>
            <br />
                {/* <div className={styles["popular-brands"]}>
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
                                    translate:`${-1*(carouselPosition)}px`
                                }}
                            >
                                <div className={styles.brand}>1</div>
                                <div className={styles.brand}>2</div>
                                <div className={styles.brand}>3</div>
                                <div className={styles.brand}>4</div>
                                <div className={styles.brand}>5</div>
                                <div className={styles.brand}>6</div>
                                <div className={styles.brand}>7</div>
                                <div className={styles.brand}>8</div>
                                <div className={styles.brand}>9</div>
                                <div className={styles.brand}>10</div>
                                <div className={styles.brand}>11</div>
                                <div className={styles.brand}>12</div>
                            </div>
                        </div>
                        <button className={`${styles.arrow} ${styles.right}`}
                            onClick={rightArrowHandler}
                        >
                            <img src={rigthArrow} alt="right arrow" />
                        </button>
                        
                        
                    </div>
                </div> */}
                <br />
            <br />
            <br />
            <Carousel>
                <div className={styles.brand}>1</div>
                <div className={styles.brand}>2</div>
                <div className={styles.brand}>3</div>
                <div className={styles.brand}>4</div>
                <div className={styles.brand}>5</div>
                <div className={styles.brand}>6</div>
                <div className={styles.brand}>7</div>
                <div className={styles.brand}>8</div>
                <div className={styles.brand}>9</div>
                <div className={styles.brand}>10</div>
                <div className={styles.brand}>11</div>
                <div className={styles.brand}>12</div>
            </Carousel>
        </div>
    </div>;
}
 
export default About;