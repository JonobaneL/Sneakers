import React from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import styles from './Shoes.module.scss'
import ShoesList from '../../components/shoesList/ShoesList';
import { getShoes } from '../../utils/getShoesPageData';
const Shoes = () => {
    const {type} = useParams();
    const [shoes,shoesCategories,shoesBrands,shoesMaterial] = getShoes(type)
    console.log('shoes',shoes);
    console.log('shoesCategories',shoesCategories);
    console.log('shoesBrands',shoesBrands);
    console.log('shoesMaterial',shoesMaterial);
    return (
        <div className={styles.shoes}>
            <div className={styles.content}>
              <div className={styles.title}>
                  <h2>{type}
                    {type=='men' ||type=='women'?`'s shoes`:null}
                  </h2>
              </div>
              <div className={styles.filters}>
                <Filters data={{shoes,shoesCategories,shoesBrands,shoesMaterial}}/>
              </div>
              <div className={styles.list}>
                <ShoesList data={shoes}/>
                <div className={styles.listNavigation}>

                </div>
              </div>
            </div>
        </div>
    );
};


export default Shoes;