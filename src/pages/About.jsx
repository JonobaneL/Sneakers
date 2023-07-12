import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { getCategories, getProduct, getProductModel, getProducts } from '../firedbAPI';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';


const About = () => {
    const brands = ['Sperry', 'Nike']
    const categories = ['Boat Shoes']
    const color = ['Brown']
    const [products,setProducts] = useState([])
    const [isLoading,,product] = useAsync(()=>getProduct('l1RG7ni8wLomgnkkuoC5'),[],'firebase')
    if(!isLoading){
      console.log(product)
    }
   
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