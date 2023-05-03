import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { AnimatePresence, delay, motion, useAnimate } from 'framer-motion';
import sneker from '../images/sneakers.png'
import boot from '../images/boot.png'
import sandal from '../images/sandal.png'
import Carousel from '../components/UI/carousel/Carousel';
const About = () => {
 
  const home_data= [
    {id:1,season:'summer 2023',title:"Hello new season",description:'Limited time to offer - up to 50% off',link:"/shoes/men",img:sneker},
    {id:2,season:'summer 2023',title:"reach the tops",description:'convenient shoes for you trip',link:"/shoes/men",img:boot},
    {id:3,season:'summer 2023',title:"Inspire Your Look",description:'Check out the latest trends for your events.',link:"/shoes/men",img:sandal},
  ]
  const block ={
    width:"200px",
    height:'200px',
    fontSize:"50px",
    color:"#fff",
    display:'flex',
    alignitems:'center',
    justifyContent:'center',
  }
  
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles.carousel} style={{width:'100%',marginInline:'auto'}}>
            
            <Carousel data={home_data}>
              <div style={{...block,background:"#8b1919"}}>Slide 1</div>
              <div style={{...block,background:"#4c8b19"}}>Slide 2</div>
              <div style={{...block,background:"#19838b"}}>Slide 3</div>
            </Carousel>
          </div>
        </div>
    </div>;
}
 
export default About;