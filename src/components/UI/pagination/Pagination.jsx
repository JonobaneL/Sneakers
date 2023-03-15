import React from 'react';
import styles from './Pagination.module.scss'
const Pagination = ({pages, current, changePage}) => {
    return (
        <div className={styles.pagination}>
            {
                pages.map(item=>
                    <div 
                        key={item} 
                        className={`${styles.pagination__item} ${current==item?styles.active:''}`}
                        onClick={()=>changePage(item)}
                    >
                        {item}
                    </div>
                    )
            }
        </div>
    );
};


export default Pagination;