import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { getCategories, getProduct, getProductModel } from '../firedbAPI';
import Loader from '../components/UI/loader/Loader';


const About = () => {
    const brands = ['Adidas', 'Nike']
    const categories = ['Boat Shoes']
    const color = ['Brown']
  
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles["approved-filters"]}>
            {
              [...brands,...categories,...color].map((item,index)=>{
                return <div key={index} className={styles['approved-filters__item']}>
                    {item}
                </div>
              })
            }
          </div>
       
          
        </div>
    </div>;
}
 
export default About;