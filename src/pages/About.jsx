import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { AnimatePresence, AnimateSharedLayout, delay, motion, useAnimate } from 'framer-motion';
import sneker from '../images/sneakers.png'
import boot from '../images/boot.png'
import sandal from '../images/sandal.png'
import Carousel from '../components/UI/carousel/Carousel';
import { LayoutGroup } from 'framer-motion';
const About = () => {
  const [position,setPosition] = useState(0)
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
  const [items,setItems] = useState([])
  const addEvent = ()=>{
    let ran = Math.floor(Math.random() * (100 - 2 + 1)) + 2;
    setItems(p=>[...p,{id:ran}])
  }
  const removeEvent =()=>{
    const newItems = [...items]
    newItems.splice(0,1)
    setItems(newItems)
  }
    return <div className={styles.about}>
        <div className={styles.content} >
          {/* <div className={styles.carousel} style={{width:'100%',marginInline:'auto'}}> */}
            
            {/* <Carousel data={home_data}>
              <div style={{...block,background:"#8b1919"}}>Slide 1</div>
              <div style={{...block,background:"#4c8b19"}}>Slide 2</div>
              <div style={{...block,background:"#19838b"}}>Slide 3</div>
              <div style={{...block,background:"#945821"}}>Slide 4</div>
              <div style={{...block,background:"#115c14"}}>Slide 5</div>
              <div style={{...block,background:"#15115c"}}>Slide 6</div>
            </Carousel> */}
           
              
              <ul className={styles.list}>
              <AnimatePresence mode="popLayout">
                {items.map((item,index) => (
                  <motion.li
                    className={styles.listItem}
                    layout
                    // initial={{ x: 20, opacity: 0 }}
                    animate={{ translateX: 0, opacity: 1 }}
                    exit={{ translateX: -200, opacity: 0 }}
                    transition={{ type: "spring",duration:2 }}
                    key={index}
                    onClick={removeEvent}
                  />
                ))}
              </AnimatePresence>
      </ul>
            <div style={{display:'flex',gap:'10px',margin:'10px'}}>
              <button
                onClick={addEvent}
              className={styles.btn1}>Click 1</button>
              <button
                onClick={removeEvent}
                className={styles.btn2}>Click 2</button>
            </div>
            
          </div>
        {/* </div> */}
    </div>;
}
 
export default About;