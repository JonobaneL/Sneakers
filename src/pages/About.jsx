import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { useInput } from '../hooks/useInput';


const About = () => {
  const [flag1,setFlag1] = useState(0)
  const [flag2,setFlag2] = useState(0)
  const [flag3,setFlag3] = useState(0)
  const [flag4,setFlag4] = useState(0)

  useEffect(()=>{
    console.log('useEffect worked');
  },[flag1,flag2,flag3,flag4])
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className="">
          <button
          onClick={()=>setFlag1(p=>p+1)}
          >Click 1</button>
          </div>
          <div className="">
          <button
          onClick={()=>setFlag2(p=>p+1)}
          >Click 2</button>
          </div>
          <div className="">
          <button
          onClick={()=>setFlag3(p=>p+1)}
          >Click 3</button>
          </div>
          <div className="">
          <button
          onClick={()=>setFlag4(p=>p+1)}
          >Click 4</button>
          </div>
        </div>
    </div>;
}
 
export default About;