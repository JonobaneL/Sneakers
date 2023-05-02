import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { AnimatePresence, delay, motion, useAnimate } from 'framer-motion';
import Slider from '../components/UI/slider/Slider';
import sneker from '../images/sneakers.png'
import boot from '../images/boot.png'
import sandal from '../images/sandal.png'
import { Link } from 'react-router-dom';
import Carousel from '../components/UI/carousel1/Carousel';
const About = () => {
 
  const home_data= [
    {id:1,season:'summer 2023',title:"Hello new season",description:'Limited time to offer - up to 50% off',link:"/shoes/men",img:sneker},
    {id:2,season:'summer 2023',title:"reach the tops",description:'convenient shoes for you trip',link:"/shoes/men",img:boot},
    {id:3,season:'summer 2023',title:"Inspire Your Look",description:'Check out the latest trends for your events.',link:"/shoes/men",img:sandal},
  ]

  const container={
    hidden:{
      opacity:0
    },
    visible:{
      opacity:1
    }
  }
  const item ={
    hidden:{
      x:[-20,20],
      opacity:0
    },
    visible:{
      x:0,
      opacity:1
    }
  }
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles.carousel} style={{width:'100%',marginInline:'auto'}}>
            
            <Carousel data={home_data}/>
            <br />
            <br />
            <br />
            <br />
            <motion.ul
            initial="hidden"
            animate="visible"
            variants={container}
            transition={{
              duration:0.5,
              when:'beforeChildren',
              staggerChildren: 0.4,
            }}
            >
              <motion.li variants={item} style={{fontSize:'15px'}}>Item 1</motion.li>
              <motion.li variants={item} style={{fontSize:'15px'}}>Item 2</motion.li>
              <motion.li variants={item} style={{fontSize:'15px'}}>Item 3</motion.li>
              <motion.li variants={item} style={{fontSize:'15px'}}>Item 4</motion.li>
              <motion.li variants={item} style={{fontSize:'15px'}}>Item 5</motion.li>
            </motion.ul>
          </div>
        </div>
    </div>;
}
 
export default About;