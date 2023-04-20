import React from 'react';
import styles from './BurgerButton.module.scss'
const BurgerButton = ({visible,setVisible}) => {
    
    return (
        <div className={`${styles.burger} ${visible?styles.active:''}`} onClick={()=>setVisible(prev=>!prev)}>
              <span></span>
        </div>
    );
};


export default BurgerButton;