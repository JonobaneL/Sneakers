import { memo, useState } from 'react';
import styles from './Accordion.module.scss'

const Accordion = memo(({head,children,triger}) => {
    const [isOpen,setIsOpen] = useState(false)
    return ( 
        <div className={styles.accordion}>
            <div className={styles["accordion-head"]}>
                {head}
               
            </div>
            <div className={`${styles["accordion-body"]} ${triger?styles.active:''}`}>
                {children}
            </div>
        </div>

     );
})
 
export default Accordion;