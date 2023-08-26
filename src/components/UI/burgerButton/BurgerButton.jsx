import React from 'react';
import styles from './BurgerButton.module.scss'
const BurgerButton = ({onChange}) => {
    return (
        <div className={styles.burger} onClick={()=>onChange(prev=>!prev)}>
              <span></span>
        </div>
    );
};


export default BurgerButton;