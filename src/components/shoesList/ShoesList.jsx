import React from 'react';
import styles from './ShoesList.module.scss'
import ShoesItem from '../shoesListItem/ShoesItem';
const ShoesList = ({data}) => {
    return (
        <div className={styles["shoes-list"]}>
            {data.length>0?
            data.map(item=>
                <ShoesItem key={item.id} item={item}/>
                )
            :<div className={styles.warning}>No Result</div>
            }
        </div>
    );
};


export default ShoesList;