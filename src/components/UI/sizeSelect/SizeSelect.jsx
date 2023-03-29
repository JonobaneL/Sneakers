import React from "react";
import { useState } from "react";
import styles from './SizeSelect.module.scss';

const SizeItem = ({data})=>{
    const [choosedSize,setChoosed] = useState(false)
    return <label className={styles['size-item']}>
        <input 
            type="radio" 
            name="size" 
            checked={choosedSize} 
            data-value = {data}
            onChange={(e)=>{
                console.log(e.target.dataset.value)
                setChoosed(prev=>!prev)
                console.log(choosedSize)
            }}/>
        {data}
    </label>
}

const SizeSelect = ({notAvaliable}) => {
    const size = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
    const [choosedSize,setChoosed] = useState(false)
    return <div className={styles['size-select']}>
        {size.map((item,index)=>
            <SizeItem key={index} data={item}/>
        )}
    </div>;
}
 
export default SizeSelect;