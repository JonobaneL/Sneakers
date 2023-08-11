import { useState } from 'react';
import RadioButton from '../UI/radioButton/RadioButton';
import styles from './RadioList.module.scss'

const RadioList = ({list,groupName,callback,children}) => {
    const [choosedItem,setChoosedItem] = useState();
    const buttonHandler = (e)=>{
        setChoosedItem(e.target.value)
        if(choosedItem!==e.target.value){
            callback(e.target.value)
        }
    }
    return (
        <div className={styles['radio-list']}>
            {list.map((item,index)=>
                <div
                    key={item.id}
                    className={`${styles["radio-list__item"]} ${choosedItem === item.value?styles.active:''}`}
                >   
                    <label className={`${styles['option-head']} ${item.disabled?styles.disabled:''}`}  >
                        <RadioButton id={item.id} name={groupName} value={item.value} onChange={e=>buttonHandler(e)} disabled={item.disabled} />
                        {item.label}
                    </label>
                    <div className={styles["option-body"]}>
                        {children[index]}
                    </div>
                </div>
            )}
            
        </div>
    );
};


export default RadioList;