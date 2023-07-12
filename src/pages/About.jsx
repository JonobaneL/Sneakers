import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { getCategories, getProduct, getProductModel, getProducts } from '../firedbAPI';
import Loader from '../components/UI/loader/Loader';
import { useAsync } from '../hooks/useAsync';
import { useProduct } from '../hooks/useProduct';
import SizeSelect from '../components/UI/sizeSelect/SizeSelect';
import ColorSelect from '../components/UI/colorSelect/ColorSelect';


const About = () => {
   const product = useProduct('sCakGNNfSNAHA2FhdlKD','7zGHo67VLwec0Xxl2AN8')
   const [choosed,setChoosed] = useState([])
   const [choosedColor,setChoosedColor] = useState(product.currentModelName)

   console.log(choosed)
    console.log(product)
    return <div className={styles.about}>
        <div className={styles.content} >
          <div className={styles["approved-filters"]}>
            {
             product.isLoading?<Loader/>
            :<>
            <SizeSelect sizes={product.sizes} choosed={choosed} handler={(size_data)=>setChoosed(size_data)} type='single'/>
            <ColorSelect models={product.models} poitedColor={color=>setChoosedColor(color)} locationState={{}}  />
            </>
            }
          </div>
       
          
        </div>
    </div>;
}
 
export default About;