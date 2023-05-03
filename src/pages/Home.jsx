import React from 'react';
import ProductsCarousel from '../components/ProductsCarousel/ProductsCarousel'
import Advantages from '../components/UI/advantages/Advantages';
import Subscribe from '../components/Subscribe/Subscribe';
import Carousel from '../components/UI/carousel1/Carousel';
import sneker from '../images/sneakers.png'
import boot from '../images/boot.png'
import sandal from '../images/sandal.png'
const Home = () => {
    const home_data= [
        {id:1,season:'summer 2023',title:"Hello new season",description:'Limited time to offer - up to 50% off',link:"/shoes/men",img:sneker},
        {id:2,season:'summer 2023',title:"reach the tops",description:'convenient shoes for you trip',link:"/shoes/men",img:boot},
        {id:3,season:'summer 2023',title:"Inspire Your Look",description:'Check out the latest trends for your events.',link:"/shoes/men",img:sandal},
      ]
    return (
        <div>
            {/* <Tabs/> */}
            <Carousel data={home_data}/>
            <ProductsCarousel />
            <Subscribe/>
            <Advantages/>
        </div>
    );
};


export default Home;