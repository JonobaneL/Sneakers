import React from "react";
import styles from './AccordionButton.module.scss'

const AccordionButton = ({triger = null,handler,theme}) => {
    const DARK_THEME={
        background:"#0d1321"
    }
    const WHITE_THEME={
        background:"#fff"
    }
    return ( 
        <div onClick={handler} className={`${styles.btn} ${triger?styles.opened:''}`}>
            <div style={theme=="dark"?DARK_THEME:WHITE_THEME} className={styles.btnLine1}></div>
            <div style={theme=="dark"?DARK_THEME:WHITE_THEME} className={styles.btnLine2}></div>
        </div>
     );
}
 
export default AccordionButton;