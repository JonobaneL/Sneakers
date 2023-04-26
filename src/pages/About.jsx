import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import styles1 from './about-css.module.css'

const About = () => {
  
    return <div className={styles.about}>
        <div className={styles.content} >
            
          <div className={styles1.parent}>
            <div className={styles1.block1}>
               <p>
                  Hello new season
                </p>
            </div>
            <div className={styles1.block2}></div>
          </div>
        </div>
        
    </div>;
}
 
export default About;

{/* <div style={{transform:`translate(${x/100}%,${y/100}%)`}} className={styles.circle1}></div>
<div style={{transform:`translate(${x/200}%,${y/200}%)`}} className={styles.circle2}></div>
<div style={{transform:`translate(${x/150}%,${y/150}%)`}} className={styles.circle3}></div> */}