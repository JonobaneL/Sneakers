import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { getCategories } from '../firedbAPI';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';


const About = () => {
    // const {isLoading,categories} = getCategories();
    const isLoading =false
    const arr=[
      {id:'p1',name:'Sandals',parent_id:null},
      {id:'p2',name:'Sneakers',parent_id:null},
      {id:'p3',name:'Boat Shoe',parent_id:null},
      {id:'p4',name:'Work Boots',parent_id:'p5'},
      {id:'p5',name:'Boots',parent_id:null},
      {id:'p6',name:'Hight Tops',parent_id:'p2'},
      {id:'p7',name:'Athletic',parent_id:'p2'},
      {id:'p8',name:'Chalse',parent_id:'p5'},
    ]
    const cat = useAsync(getCategories);
    
    return <div className={styles.about}>
        <div className={styles.content} >
        
        {
          isLoading?<Loader />
          :<ul>
          {
            arr.map(item=>{
              return <li key={item.id}>
                {item.name}
              </li>
            })
          }
        </ul>
        }
          
        </div>
    </div>;
}
 
export default About;