import React from 'react';
import { useState } from 'react';
import styles from './InfoTabs.module.scss'
const InfoTabs = ({titles,children}) => {
    const [currentTab,setCurretTab] = useState(titles[0].id)
    return (
        <div className={styles["info-tabs"]}>
            <div className={styles["tabs-nav"]}>
                {titles.map((item)=>
                    <div 
                        key={item.id} 
                        className={`${styles["nav-item"]} ${item.id==currentTab?styles.active:''}`}
                        onClick={()=>setCurretTab(item.id)}
                        >{item.name}</div>
                    )}
            </div>
            <div className={styles["tabs-content"]}>
                {children.map((item,index)=>
                <div key={index} className={`${styles.tab} ${(index+1)==currentTab?styles.active:''}`}>
                    {item}
                </div>
                )}
            </div>
            
        </div>
    );
};


export default InfoTabs;