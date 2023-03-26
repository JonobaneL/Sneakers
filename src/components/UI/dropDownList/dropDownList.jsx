import React from 'react';
import DropDownListItem from '../DropDownListItem/DropDownListItem';
import styles from './dropDonwList.module.scss'

const DropDownList = ({getData, data}) => {
    return (
        <div className={styles.dropDownList}>
            {
                data.map(item=>
                    <DropDownListItem key={item.id} data={item} getData={getData}/>
                )
            }
        </div>
    );
};


export default DropDownList;