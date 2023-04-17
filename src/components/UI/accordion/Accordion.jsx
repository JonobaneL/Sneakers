import React, {useState} from 'react';
import AccordionButton from '../accordion-button/AccordionButton';
import styles from './Accordion.module.scss'

const Accordion = ({width='100%',title,children,fixed=false,autoheight=false,data=[],handler,theme="dark"}) => {
    const [isOpen, setIsOpen] = useState(fixed||false)
    const DARK_THEME = {
        width:width,
        color:"#1d2d44",
        borderBottom:"1px solid #3e5c765c"
    }
    const WHITE_THEME = {
        width:width,
        color:"#fff",
        borderBottom:"1px solid #fff"
    }
    const openContent=()=>{
        !fixed?
        setIsOpen(prev=>!prev)
        : null
    }
    const clearTriger = data.length>0?true:false;
    const clearHandler = ()=>{
        window.scrollTo(0,0)
        handler();
    }
    const autoheightStyles = {
        height:'auto',
        maxHeight:'none'
    }
    return (
        <div style={theme=="dark"?DARK_THEME:WHITE_THEME} className={styles.accordion}>
            <div className={styles.title}>
                <span onClick={openContent} className={styles['title-text']}>{title}</span>
                <p className={`${styles['clear-btn']} ${clearTriger?styles.active:''}`} onClick={clearHandler}>Clear</p>
                {
                    !fixed?<AccordionButton theme={theme} handler={openContent} triger={isOpen}/>:null
                }
            </div>
            <div style={autoheight?autoheightStyles:null} className={`${styles.content} ${isOpen?styles.showed:''}`}>
                {children}
            </div>
        </div>
    );
};


export default Accordion;