import React, {useEffect, useState, useRef} from 'react';
import CarouselCard from '../CarouselCard/CarouselCard';
import styles from './ProductsCarousel.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./settings.css"
import {bestSellers,novelty} from '../../data/homeSneakersData'


const ProductsCarousel = () => {
    const [data,setData] = useState([...bestSellers])
    const slider = useRef(null)
    const listNav = [
        {id:1, value:"Best Sellers"},
        {id:2, value:"Newest"},
    ]
    const [current,setCurrent] = useState(listNav[0].id);
    const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        dotsClass: styles.dots__bar,
        responsive:[
            {
                breakpoint: 1360,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
            },
            {
                breakpoint: 1130,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
            },
            {
                breakpoint: 880,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
            },
        ],
      };
     
    useEffect(()=>{
        if(current==1){
            setData([...bestSellers])
            slider.current.slickGoTo(0)
        }else if(current==2){
            setData([...novelty])
            slider.current.slickGoTo(0)
        }
    },[current])
    return (
        <div className={styles.shortList}>
            <div className={styles.content}>
                <ul className={styles.nav}>
                    {listNav.map(item=>
                        <li
                            key={item.id}
                            className={styles.nav__item+" "+ (current==item.id?styles.active:'')}
                            onClick={()=>setCurrent(item.id)}
                        >{item.value}</li>
                    )}
                </ul>
                <Slider ref={slider} {...settings}>
                    {
                        data.map(item=>
                            <CarouselCard key={item.id} data={item}/>)
                    }
                </Slider>
            </div>
        </div>
    );
};


export default ProductsCarousel;