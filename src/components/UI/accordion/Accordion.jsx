import React, {useState} from 'react';
import AccordionButton from '../accordion-button/AccordionButton';
import styles from './Accordion.module.scss'

const Accordion = ({width,title,children,fixed}) => {
    const [isOpen, setIsOpen] = useState(fixed||false)
    const openContent=()=>{
        !fixed?
        setIsOpen(prev=>!prev)
        : null
    }
    return (
        <div  style={{width:width}} className={styles.accordion}>
            <div onClick={openContent} className={styles.title}>
                {title}
                {
                    !fixed?<AccordionButton triger={isOpen}/>:null
                }
            </div>
            <div className={`${styles.content} ${isOpen?styles.showed:''}`}>
                {children}
            </div>
        </div>
    );
};


export default Accordion;