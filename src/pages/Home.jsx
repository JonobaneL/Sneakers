import React from 'react';
import Tabs from '../components/UI/tabs/Tabs';
import ProductsCarousel from '../components/ProductsCarousel/ProductsCarousel'
import Advantages from '../components/UI/advantages/Advantages';
import Subscribe from '../components/Subscribe/Subscribe';

const Home = () => {
    return (
        <div>
            <Tabs/>
            <ProductsCarousel />
            <Subscribe/>
            <Advantages/>
        </div>
    );
};


export default Home;