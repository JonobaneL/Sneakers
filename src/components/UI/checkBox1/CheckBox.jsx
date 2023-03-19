import React,{useState} from 'react';
import styles from './CheckBox.module.scss'

const CheckBox = ({label}) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div>
            <label className={styles.checkBox}>
                <input className={styles["input-field"]} type="checkbox" checked={isChecked} onChange={()=>setIsChecked(prev=>!prev)} />
                <span className={styles["checkBox-label"]}>{label}</span>
            </label>
        </div>
        
    );
};


export default CheckBox;