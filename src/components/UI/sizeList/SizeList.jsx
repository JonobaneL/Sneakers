import React from 'react';
import styles from './SizeList.module.scss'
const SizeList = () => {
    const size = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15]
    return (
        <div className={styles["size-list"]}>
            {size.map((item,index)=>
                <div key={index} className={styles.item}>{item}</div>
                )}
        </div>
    );
};


export default SizeList;