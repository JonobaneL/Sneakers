import React from 'react';
import styles from './ShoesList.module.scss'
import ShoesItem from '../shoesListItem/ShoesItem';
const ShoesList = ({data}) => {
    return (
        <div className={styles["shoes-list"]}>
            {data.map(item=>
                <ShoesItem key={item.id} item={item}/>
                )}
        </div>
    );
};


export default ShoesList;