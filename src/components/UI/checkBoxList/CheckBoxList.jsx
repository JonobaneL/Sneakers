import React from 'react';
import styles from './CheckBoxList.module.scss'
import darkMark from '../../../images/check-mark/dark-icon.svg'
import whiteMark from '../../../images/check-mark/white-icon.svg'
import {getContrast} from '../../../utils/contrast'

const CheckBoxItem = ({item,checkedItems,event,color="#ffffff"})=>{
    const iconColor = getContrast(color)
    return <li 
        className={`${styles['list-item']} ${checkedItems.includes(item.name)?styles.active:''}`}
        onClick={()=>event(item.name)}
        
        >
            <div className={styles["checkbox-indicator"]}
            style={{background:color,border:color=="#ffffff"?"1px solid rgba(62, 92, 118,0.8)":'none'}}
            >
                <img className={styles['checkbox-mark']} src={iconColor=='white'?whiteMark:darkMark} alt="checkbox-indicator" />
            </div>
            <p className={styles['list-title']}>
                {item.name}
            </p>
    </li>
};


const CheckBoxList = ({data,checkedItems,handler,colored=false}) => {
    const handleClick= (item)=>{
        if(!checkedItems.includes(item)){
            handler([...checkedItems,item])
        }
        else{
            handler(checkedItems.filter(checked_item => checked_item!==item))
        }
    }
    return (
            <ul className={styles['checkbox-list']}>
            {
                data.map((item,index)=>
                <CheckBoxItem key={index} item={item} checkedItems={checkedItems} event={handleClick} color={colored?item.color:"#ffffff"} /> 
                )
            }
            </ul>
    );
};

export default CheckBoxList;

// <li 
                    // key={index} 
                    // className={`${styles['list-item']} ${checkedItems.includes(item.name)?styles.active:''}`}
                    // onClick={()=>handleClick(item.name)}
                    // >
                    //     <div className={styles["checkbox-indicator"]}>
                    //         <img className={styles['checkbox-mark']} src={darkMark} alt="checkbox-indicator" />
                    //     </div>
                    //     <p className={styles['list-title']}>
                    //         {item.name}
                    //     </p>
                    // </li>