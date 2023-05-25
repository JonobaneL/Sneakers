import React,{useEffect, useState} from 'react';
import styles from './DropDownListItem.module.scss'
import transit from './dropDownTransition.module.scss'
import { CSSTransition } from 'react-transition-group';
const DropDownListItem = ({data,getData,fixed=false}) => {
    const [isOpen,setIsOpen] = useState(fixed||false);
    return (
        <div tabIndex={0} onBlur={()=>setIsOpen(false)} className={styles.listItem}>
            <div className={styles.mainItem}>
                <p onClick={e=>{
                    e.preventDefault();
                    getData(data)
                }}>{data.name}</p>
                {data["sub-category"]
                    ?<span onClick={()=>{setIsOpen(prev=>!prev)}} className={`${styles.arrow} ${isOpen?styles.active:' '}`}>&#9662;</span>
                    :null    
                }
            </div>
            {
                data["sub-category"]
                ?<CSSTransition
                    in={isOpen}
                    timeout={200}
                    mountOnEnter
                    classNames={transit}
                    unmountOnExit
                >
                    <div  className={`${styles.subList}`}>
                        {data["sub-category"].map(item=>
                            <div 
                                onClick={e=>{
                                    e.preventDefault();
                                    getData(item)
                                }} 
                                key={item.id} 
                                className={styles.subList__item}
                            >
                                <p>{item.name}</p> 
                            </div>
                        )}
                    </div>
                </CSSTransition>
                :null
            }
        </div>
    );
};


export default DropDownListItem;