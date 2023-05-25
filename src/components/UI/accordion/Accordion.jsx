import { useState } from 'react';
import AccordionButton from '../accordion-button/AccordionButton';
import styles from './Accordion.module.scss'

const Accrodion = ({header,children,fixed=false,autoHeight=false,theme='dark'}) => {
    const [isOpen,setIsOpen] = useState(fixed||false)
    const openAccordion = ()=>{
        setIsOpen(p=>!p)
    }
   
    return ( 
        <div className={styles.accordion}>
            <div className={styles["accordion-header"]} onClick={openAccordion}>
                <div className={styles.title} >
                    <div className={styles.content}>
                        {header}
                    </div>
                    {
                        !fixed && <AccordionButton theme={theme} handler={openAccordion} triger={isOpen}/>
                    }
                </div>
                
            </div>
            <div className={`${styles["accordion-body"]} ${autoHeight?styles.autoHeight:''} ${isOpen ?styles.opened:''} `}>
                {children}
            </div>
        </div>
     );
}
 
export default Accrodion;