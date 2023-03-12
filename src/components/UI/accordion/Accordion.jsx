import React, {useState} from 'react';
import AccordionButton from '../accordion-button/AccordionButton';
import styles from './Accordion.module.scss'

const Accordion = ({width,title,children}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div  style={{width:width}} className={styles.accordion}>
            <div onClick={()=>setIsOpen(prev=>!prev)} className={styles.title}>
                {title}
                <AccordionButton triger={isOpen}/>
            </div>
            <div className={`${styles.content} ${isOpen?styles.showed:''}`}>
                {children}
            </div>
        </div>
    );
};


export default Accordion;