import React, {useRef} from 'react';
import styles from './BurgerButton.module.scss'
const BurgerButton = ({show}) => {
    const burgerButton = useRef(null);
     const burgeListener = ()=>{
        show();
        burgerButton.current.classList.toggle(styles.active)
     }
    return (
        <div ref={burgerButton} className={styles.burger} onClick={burgeListener}>
              <span></span>
        </div>
    );
};


export default BurgerButton;