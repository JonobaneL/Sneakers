import { memo } from 'react'
import styles from './SInput.module.scss'


const SInput = memo(({height,params,theme,value,setValue}) => {
    const WHITE_THEME = {
        color: "#fff",
        borderBottom: "1px solid #fff",
    }
    const DARK_THEME = {
        color: "#1D2D44",
        borderBottom: "1px solid #1D2D44",
    }
    return  <input 
        style={{height:height}} 
        data-theme={theme} 
        className={styles.sInput} 
        {...params}
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        />;
})

 
export default SInput;