import React from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import styles from './Shoes.module.scss'

const Shoes = () => {
    const {type} = useParams();
    console.log(type)
    return (
        <div className={styles.shoes}>
            <div className={styles.content}>
              <h2 className={styles.title}>{type}
                {type=='men' ||type=='women'?`'s shoes`:null}
              </h2>
              <Filters/>
            </div>
        </div>
    );
};


export default Shoes;