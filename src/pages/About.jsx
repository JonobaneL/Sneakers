import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
// import { getCart, getCategories, getProduct, getProductModel, getProducts } from '../firebase/cartFirebaseAPI ';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import { useProduct } from '../hooks/useProduct';
import SizeSelect from '../components/UI/sizeSelect/SizeSelect';
import ColorSelect from '../components/UI/colorSelect/ColorSelect';
import Button from '../components/UI/button/Button';
import { getAllProductsModels, getProduct } from '../productFirebaseAPI';


const About = () => {
  const [productsModels,setProductsModels] = useState([])
  const productsGetter = (type='shoes',male='men')=>{
    getAllProductsModels(type,male).then(data=>{
      data.forEach(item=>{
        const temp = item.data()
        getProduct(temp.productID).then(res=>{
          const tempProduct = res.data()
          setProductsModels(p=>[...p,{...temp,...tempProduct}])
        })
      }
        ) 
    })
  }
  console.log(productsModels)

    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles["approved-filters"]}>
              <Button mode='primary' width='180px' height='60px' onClick={()=>productsGetter('shoes','men')} />
          </div>
          
        </div>
    </div>;
}
 
export default About;