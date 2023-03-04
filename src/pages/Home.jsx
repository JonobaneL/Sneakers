import React from 'react';
import Tabs from '../components/UI/tabs/Tabs';
import ShortCardList from '../components/ShortCardLIst/ShortCardList'
import Advantages from '../components/UI/advantages/Advantages';
import Subscribe from '../components/Subscribe/Subscribe';

const Home = () => {
    return (
        <div>
            <Tabs/>
            <ShortCardList />
            <Subscribe/>
            <Advantages/>
        </div>
    );
};


export default Home;