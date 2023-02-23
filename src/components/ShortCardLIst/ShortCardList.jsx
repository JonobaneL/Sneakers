import React from 'react';
import Card from '../Card/Card';
import styles from './ShortCardList.module.scss'

const ShortCardList = ({title,params}) => {
    console.log(params)
    return (
        <div className={styles.shortList}>
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <ul className={styles.cards}>
                    {
                        params.map(item=>
                            <Card key={item.id} data={item}/>
                            )
                    }
                </ul>
            </div>
        </div>
    );
};


export default ShortCardList;