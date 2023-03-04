import React, {useEffect, useState} from 'react';
import Card from '../Card/Card';
import styles from './ShortCardList.module.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import {bestSellers,novelty} from '../../data/homeSneakersData'
const DATA = [
    {id:1,name:`Women's Zavala Combat Boot`,price:129.99,discount:46,image:'https://www.famousfootwear.com/blob/product-images/20000/39/31/0/39310_right_feed1000.jpg'},
    {id:2,name:`Women's Air Max Bella 5 Training Shoe`,price:89.99, discount:0,image:'https://www.famousfootwear.com/blob/product-images/20000/55/07/2/55072_right_feed1000.jpg'},
    {id:3,name:`Men's Air Max Alpha Trainer 5 Sneaker`,price:89.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/38/32/6/38326_right_feed1000.jpg'},
    {id:4,name:`Men's Court Vision Mid Sneaker`,price:84.99,discount:9, image:'https://www.famousfootwear.com/blob/product-images/20000/52/07/4/52074_right_feed1000.jpg'},
    {id:5,name:`Women's Embury Chelsea Boot`,price:109.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/76/52/1/76521_right_feed1000.jpg'},
    {id:6,name:`Men's Air Max Excee Sneaker`,price:89.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/96/02/2/96022_right_feed1000.jpg'},
    {id:7,name:`Women's Essentials Arizona Footbed Sandal`,price:49.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/94/96/2/94962_right_feed1000.jpg'},
    {id:8,name:`Men's Hoops 3.0 Mid Sneaker`,price:69.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/97/89/6/97896_right_feed1000.jpg'},
    {id:9,name:`Men's Charged Assert 9 Medium/Wide Running Shoe`,price:74.99,discount:0, image:'https://www.famousfootwear.com/blob/product-images/20000/36/28/4/36284_right_feed1000.jpg'},
    {id:10,name:`Women's Tango 2 Medium/Wide Espadrille Wedge Sandal`,price:79.99,discount:55, image:'https://www.famousfootwear.com/blob/product-images/20000/57/75/2/57752_right_feed1000.jpg'},
]

const ShortCardList = () => {
    const [data,setData] = useState([...bestSellers])
    
    console.log(data);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
      };
    const listNav = [
        {id:1, value:"Best Sellers"},
        {id:2, value:"Novelty"},
    ]
    const [current,setCurrent] = useState(listNav[0].id);
    useEffect(()=>{
        if(current==1){
            setData([...bestSellers])
            console.log('Best Sellers')
        }else if(current==2){
            setData([...novelty])
            console.log('Novelty')
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
                <Slider {...settings}>
                    {
                        data.map(item=>
                            <div onClick={()=>{console.log(item.id)}} key={item.id} className={styles.card}>
                                <img src={item.image} alt={item.name} />
                                <div className={styles.info}>
                                    <p className={styles.name}>{item.name}</p>
                                    <p className={styles.price}>${item.price}</p>
                                </div>
                            </div>)
                    }
                </Slider>
            </div>
        </div>
    );
};


export default ShortCardList;