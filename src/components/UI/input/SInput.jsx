import { memo } from 'react'
import styles from './SInput.module.scss'

const SInput = memo(({height,params,theme}) => {
    const WHITE_THEME = {
        height:height,
        color: "#fff",
        borderBottom: "1px solid #fff",
    }
    const DARK_THEME = {
        height:height,
        color: "#1D2D44",
        borderBottom: "1px solid #1D2D44",
    }
    // console.log(theme)
    return  <input style={{height:height}} data-theme={theme} className={styles.sInput} {...params}/>;
})

 
export default SInput;