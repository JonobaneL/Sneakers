import React, {useState} from 'react';
import styles from './Select.module.scss'
import arrow from '../../../images/down-arrow.png'
const Select = ({placeholder, params,getData}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectValue, setSelectValue] = useState({})
   
    const selectOption = option =>{
        setSelectValue(option)
        getData(option.id)
        setIsOpen(false)
    }
    const isOptionSelected=(option)=>{
        return option.id === selectValue.id
    }
    return (
        <div tabIndex={0} className={styles.select} onBlur={()=>setIsOpen(false)}>
            <div className={styles.selectField} onClick={()=>{setIsOpen(!isOpen)}}  >
                <p>{selectValue.value||<span className={styles.placeholder}>{placeholder}</span>}</p>
                <button className={`${styles.arrow} ${isOpen?styles.active:''}`}>
                    <img src={arrow} alt="" />
                </button>
            </div>
            <div className={`${styles.options} ${isOpen?styles.active:''}`} >
                <ul>
                    {
                        params.map(item=>
                            <li 
                                key={item.id} 
                                onClick={e=>{
                                    e.stopPropagation();
                                    selectOption(item)
                                }} 
                                className={`${styles.options__item} ${isOptionSelected(item)?styles.active:''}`}
                            >
                                {item.value}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
};


export default Select;