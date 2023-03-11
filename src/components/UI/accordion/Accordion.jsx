import React, {useState} from 'react';
import styles from './Accordion.module.scss'

const Accordion = ({width,title,children}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div  style={{width:width}} className={styles.accordion}>
            <div onClick={()=>setIsOpen(prev=>!prev)} className={styles.title}>
                {title}
                {!isOpen?<span>&#65122;</span>:<span>&#65123;</span>}
            </div>
            <div className={`${styles.content} ${isOpen?styles.showed:''}`}>
                {children}
            </div>
        </div>
    );
};


export default Accordion;