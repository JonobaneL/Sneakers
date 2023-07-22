import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
// import { getCart, getCategories, getProduct, getProductModel, getProducts } from '../firebase/cartFirebaseAPI ';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import { useProduct } from '../hooks/useProduct';
import SizeSelect from '../components/UI/sizeSelect/SizeSelect';
import ColorSelect from '../components/UI/colorSelect/ColorSelect';
import Button from '../components/UI/button/Button';
import { getAllProductsModels, getProduct } from '../firebase/productFirebaseAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, fetchFavorites } from '../redux/favoritesSlice';


const About = () => {
    const [data,setData] = useState([]);
    const getData = ()=>{
      fetch( 'https://jsonplaceholder.typicode.com/photos?_page=0&_limit=10')
      .then(response=>response.json())
      .then(arr=>setData(arr))
    }
    useEffect(()=>{
      setTimeout(()=>{
        getData()
      },2000)
      return ()=>{
        clearTimeout()
      }
    },[])
    console.log(data)
    return <div className={styles.about}>
        <div className={styles.content} >
          {/* <div className={styles["skeleton-card"]}>
              <div className={styles.skeleton__img}/>
              <div className={styles.skeleton__title}>
                <div className={styles.line}/>
                <div className={styles.line}/>
              </div>
          </div> */}
         
          {true?
           <div className={styles.list}>
          {    Array(10).fill(1).map((_,index)=>{
                  return <div key={index} className={styles["skeleton-card"]}>
                            <div className={styles.skeleton__img}/>
                            <div className={styles.skeleton__title}>
                              <div className={styles.brand}/>
                              <div className={styles.name}/>
                              <div className={styles.rate}/>
                              <div className={styles.price}/>
                            </div>
                          </div>
              })}
          </div>
          :<div className={styles.list}>
            {
              data.map((item,index)=>{
                
                return <div key={index} className={styles.card}>
                  <img src={item.url} alt="index" />
                  <h3>{item.title}</h3>
                </div>
                })
              }
            </div>
          }
          
          
        </div>
    </div>;
}
 
export default About;