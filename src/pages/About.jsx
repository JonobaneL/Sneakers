import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { useNavigate } from 'react-router-dom'
import { shoes } from '../data/shoes'
import { AnimatePresence, useAnimate, stagger,motion } from 'framer-motion'
import { useLoaderAnimation } from '../hooks/useLoaderAnimation'
import Loader from '../components/UI/loader/Loader'
import CInput from '../components/UI/input/CInput'
import { findLocation } from '../utils/searchLocation'


const About = () => {
   const [query,setQuery] = useState('')
   const locations = findLocation(query)
   const [choosed,setChoosed] = useState({})
   const [flag,setFlag] = useState(false);
   const optionHandler = (e,item) =>{
      setQuery(item.name);
      setChoosed(item.id)
   }
    return <div className={styles.about}>
        <div className={styles.content} >
          <div 
            className={styles.autocomplete} 
            onClick={()=>setFlag(true)}
            onBlur={e=>setFlag(false)}
            >
            <div className={styles.autocomplete__field}>
              <CInput 
                value={query}
                onChange={e=>setQuery(e.target.value)}
                mode='fullBorder' 
                height={45} 
                placeholder="Choose your city" />
            </div>
            {
                (flag && query.length>0) && <ul className={styles['autocomplete-options']}>
                {
                  locations.map(item=><li 
                    key={item.id}
                    className={styles['options__item']}
                    onMouseDown={e=>{
                      setQuery(item.name);
                      setChoosed(item.id)
                    }}
                  >
                    {item.name}
                  </li>)
                }
              </ul>
            }
          </div>
            <button onClick={()=>setQuery('Odesa')}>Odesa</button>
        </div>
    </div>;
}
 
export default About;