import React, { useEffect, useState } from 'react';
import DropDownListItem from '../DropDownListItem/DropDownListItem';
import styles from './dropDonwList.module.scss'

const DropDownList = ({getData, data}) => {
    const [choosedCategory,setChoosedCategory] = useState(null)
    useEffect(()=>console.log(choosedCategory),[choosedCategory])

    const handleChange = (el)=>{

    }
    return (
        <div className={styles.dropDownList}>
            {setChoosedCategory.length>0?<div>{choosedCategory}</div>:null}
            {
                data.map(item=>
                    <DropDownListItem key={item.id} data={item} getData={(el)=>setChoosedCategory({...el})}/>
                )
            }
        </div>
    );
};


export default DropDownList;