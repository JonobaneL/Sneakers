import React from "react";
import styles from './AccordionButton.module.scss'

const AccordionButton = ({triger = null}) => {
    
    return ( 
        <div className={`${styles.btn} ${triger?styles.opened:''}`}>
            <div className={styles.btnLine1}></div>
            <div className={styles.btnLine2}></div>
        </div>
     );
}
 
export default AccordionButton;