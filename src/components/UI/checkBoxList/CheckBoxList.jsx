import React, {useState,useEffect} from 'react';
import CheckBox from '../checkBox/CheckBox';
import styles from './CheckBoxList.module.scss'
const CheckBoxList = ({filtersChange,data,colored,clearCheckBoxs}) => {
    const [checkedItems,setCheckedItem]=useState([])
    const handleChange = (elem)=>{
        const elmentIndex = checkedItems.indexOf(elem);
        if(elmentIndex<0){
            setCheckedItem([...checkedItems,elem])
        }
        else{
            setCheckedItem(checkedItems.filter(item=>item !== elem))
        }
    }
    useEffect(()=>{
        filtersChange(checkedItems)
    },[checkedItems])
    return (
        <div className={styles["checkBox-list"]}>
            {data.map(item=>
                <CheckBox key={item.id} label={item.name} color={colored?item.color:"#ffffff"} handler={handleChange} clearBox={clearCheckBoxs} />
                )}
        </div>
    );
};


export default CheckBoxList;
