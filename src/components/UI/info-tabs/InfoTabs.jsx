import React from 'react';
import { useState } from 'react';
import styles from './InfoTabs.module.scss'
const InfoTabs = ({titles,children}) => {
    const [currentTab,setCurretTab] = useState(0)
    return (
        <div className={styles["info-tabs"]}>
            <div className={styles["tabs-nav"]}>
                {titles.map((item,index)=>
                    <div 
                        key={item.id} 
                        className={`${styles["nav-item"]} ${index==currentTab?styles.active:''}`}
                        onClick={()=>setCurretTab(index)}
                        >{item.name}</div>
                    )}
            </div>
            <div className={styles["tabs-content"]}>
                {children.map((item,index)=>
                <div key={index} className={`${styles.tab} ${index==currentTab?styles.active:''}`}>
                    {item}
                </div>
                )}
            </div>
            
        </div>
    );
};


export default InfoTabs;