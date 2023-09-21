import React from 'react';
import styles from './TopBrands.module.scss'
import nike from '../../images/brands/nike.png'
import addidas from '../../images/brands/Adidas.svg'
import newBalance from '../../images/brands/new-balance.png'
import heyDude from '../../images/brands/hey-dude.png'
import drMartens from '../../images/brands/dr.martens.png'
import converse from '../../images/brands/converse.svg'
import birkenstock from '../../images/brands/birkenstock.png'
import Carousel from '../UI/carousel/Carousel';
import { useNavigate } from 'react-router-dom';

const TopBrands = () => {
    const brands=[
        {
            id:'brand1',
            img:nike,
            name:'Nike'
        },
        {
            id:'brand2',
            img:newBalance,
            name:'New Balance'
        },
        {
            id:'brand3',
            img:heyDude,
            name:'Nike'
        },
        {
            id:'brand4',
            img:drMartens,
            name:'Dr. Martens'
        },
        {
            id:'brand5',
            img:birkenstock,
            name:'Birkenstock'
        },{
            id:'brand6',
            img:addidas,
            name:'Adidas'
        },{
            id:'brand7',
            img:converse,
            name:'Converse'
        },
       
      ]

      const navigate = useNavigate();
    return (
        <div className={styles.brands}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Top Brands</h2>
                    <Carousel
                        cardsToShow={6}
                        cardGap={15}
                    >
                        {
                            brands.map((brand,index)=><div 
                                key={brand.id} 
                                className={`${styles.brand} ${(index+1)%2==0?styles.accent:''}`}
                                onClick={()=>navigate({pathname:'shoes/all',search:`?brand=${brand.name}`})}
                                >
                                <img src={brand.img} alt={brand.name} />
                            </div>)
                        }
                    </Carousel>
                </div>
            </div>
    );
};


export default TopBrands;