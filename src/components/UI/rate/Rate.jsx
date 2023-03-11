import React from 'react';
import styles from './Rate.module.scss'
import empyStar from '../../../images/empty-star.svg'
import fullStar from '../../../images/full-star.svg'
const Rate = ({rateIndex,width}) => {
    const rate = []
    for (let i=1;i<=5;i++){
        if(i<=rateIndex) {rate.push(<img src={fullStar} alt="star" />)}
        else {rate.push(<img src={empyStar} alt="star" />)}
    }
    return (
        <div className={styles.rate} style={{width:width}}>
           {
            rate.map((item,index)=>
                <div key={index} className={styles.star}>{item}</div>
            )
           }
        </div>
    );
};


export default Rate;