import React,{useState,useEffect} from 'react';
import styles from './CheckBox.module.scss'
import darkMark from '../../../images/check-mark/dark-icon.svg'
import whiteMark from '../../../images/check-mark/white-icon.svg'
import { getContrast } from '../../../utils/contrast';

const CheckBox = ({label,color="#ffffff",handler}) => {
    const [isChecked, setIsChecked] = useState(false);
    const iconColor = getContrast(color)
    return (
        <div>
            <label className={styles.checkBox} >
                <div className={styles["check-indicator"]}>
                    <img className={`${styles["check-mark"]} ${isChecked?styles.checked:''}`} src={iconColor=='white'?whiteMark:darkMark} alt="checked" />
                    <input className={styles["input-field"]} 
                        type="checkbox" 
                        value={label} 
                        checked={isChecked} 
                        onChange={()=>setIsChecked(prev=>!prev)} 
                        onClick={e=>{
                            handler(e.target.value)
                        }}
                        style={{background:color,border:color=="#ffffff"?"1px solid rgba(62, 92, 118,0.8)":'none'}}
                    />
                </div>
                <span className={styles["checkBox-label"]}>{label}</span>
            </label>
        </div>
        
    );
};


export default CheckBox;