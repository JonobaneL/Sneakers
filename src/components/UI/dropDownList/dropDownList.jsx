import React from 'react';
import DropDownListItem from '../DropDownListItem/DropDownListItem';
import styles from './dropDonwList.module.scss'
import {menShoesCategory} from '../../../data/menShoesCategory'

const DropDownList = ({getData}) => {
    return (
        <div className={styles.dropDownList}>
            {
                menShoesCategory.map(item=>
                    <DropDownListItem key={item.id} data={item} getData={getData}/>
                )
            }
        </div>
    );
};


export default DropDownList;