import { useState } from 'react';
import styles from './Accordion.module.scss'

const Accordion = ({head,children}) => {
    const [isOpen,setIsOpen] = useState(false)
    return ( 
        <div className={styles.accordion}>
            <div className={styles["accordion-head"]}>
                {head}
                <button
                onClick={e=>{
                    e.preventDefault();
                    setIsOpen(p=>!p)
                }}
                >Show</button>
            </div>
            <div className={`${styles["accordion-body"]} ${isOpen?styles.active:''}`}>
                {children}
            </div>
        </div>

     );
}
 
export default Accordion;