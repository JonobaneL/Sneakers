import React from 'react';
import { usePagination } from '../../../hooks/usePagination';
import styles from './Pagination.module.scss'
const Pagination = ({total, current, changePage}) => {
    const pages = usePagination(total);
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