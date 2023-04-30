import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { motion } from 'framer-motion';
const About = () => {
  const aStyles = {
    hidden:{
      x:-100,
      opacity:0,
    },
    visible:{
      x:0,
      opacity:1,
    }
  }

    return <div className={styles.about}>
        <div className={styles.content} >
          <motion.p
            initial={'hidden'}
            animate={'visible'}
            transition={{
              duration:1,
              ease:'easeInOut',
              type:'spring'
            }}
            variants={aStyles}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora, unde!
          </motion.p>
            {/* <div className={styles.block}>
             
            </div> */}
        </div>
    </div>;
}
 
export default About;