import React,{useState,useEffect, useRef} from 'react';
import styles from './CheckBox.module.scss'
import darkMark from '../../../images/check-mark/dark-icon.svg'
import whiteMark from '../../../images/check-mark/white-icon.svg'
import { getContrast } from '../../../utils/contrast';

const CheckBox = ({label,color="#ffffff",handler,clearBox}) => {
    const [isChecked, setIsChecked] = useState(false);
    const iconColor = getContrast(color)
    const checkbox = useRef()
    // const clearBox = (e)=>{
    //     console.log(e.target.checked=false)
    // }
    return (
        <div>
            <label className={styles.checkBox} >
                <div className={styles["check-indicator"]}>
                    <img className={`${styles["check-mark"]} ${isChecked?styles.checked:''}`} src={iconColor=='white'?whiteMark:darkMark} alt="checked" />
                    <input className={styles["input-field"]} 
                        type="checkbox" 
                        value={label} 
                        ref={checkbox}
                        checked={isChecked} 
                        onChange={()=>setIsChecked(prev=>!prev)} 
                        onClick={e=>{
                            console.log(e)
                            handler(e.target.value)
                        }}
                        style={{background:color,border:color=="#ffffff"?"1px solid rgba(62, 92, 118,0.8)":'none'}}
                    />
                </div>
                <span className={styles["checkBox-label"]}>{label}</span>
                <span onClick={(event)=>clearBox(event)}>cle</span>
            </label>
        </div>
        
    );
};


export default CheckBox;