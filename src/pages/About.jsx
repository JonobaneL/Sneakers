import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import sneker from '../images/sneakers.png'
import Carousel from '../components/UI/carousel/Carousel';
import boot from '../images/boot.png'
import sandal from '../images/sandal.png'

const About = () => {
    const [x,setX] = useState(0);
    const [y,setY] = useState(0);
  const paralaxEvent = (e)=>{
    setX(e.clientX);
    setY(e.clientY);
  }
  const home_data= [
    {id:1,season:'summer 2023',title:"Hello new season",description:'Limited time to offer - up to 50% off',link:"/shoes/men",img:sneker},
    {id:2,season:'summer 2023',title:"reach the tops",description:'convenient shoes for you trip',link:"/shoes/men",img:boot},
    {id:3,season:'summer 2023',title:"Inspire Your Look",description:'Check out the latest trends for your events.',link:"/shoes/men",img:sandal},
  ]
    return <div className={styles.about}>
        <div className={styles.content} >
            
            <Carousel data={home_data}/>
        </div>
        
    </div>;
}
 
export default About;

{/* <div style={{transform:`translate(${x/100}%,${y/100}%)`}} className={styles.circle1}></div>
<div style={{transform:`translate(${x/200}%,${y/200}%)`}} className={styles.circle2}></div>
<div style={{transform:`translate(${x/150}%,${y/150}%)`}} className={styles.circle3}></div> */}