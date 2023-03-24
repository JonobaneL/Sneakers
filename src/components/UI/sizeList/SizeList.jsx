import React, { useEffect, useState } from 'react';
import styles from './SizeList.module.scss'
const SizeList = ({filtersChange}) => {
    const size = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
    const [choosedItems,setChoosedItem]= useState([]);
    const handleChange = (elem)=>{
        const elmentIndex = choosedItems.indexOf(elem);
        if(elmentIndex<0){
            setChoosedItem([...choosedItems,elem])
        }
        else{
            setChoosedItem(checkedItems.filter(item=>item !== elem))
        }
    }
    useEffect(()=>{
        filtersChange(choosedItems)
    },[choosedItems])
    return (
        <div className={styles["size-list"]}>
            {size.map((item,index)=>
                <div key={index} className={styles.item} onClick={()=>handleChange(item)}>{item}</div>
                )}
        </div>
    );
};


export default SizeList;