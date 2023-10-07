import React,{useState,useEffect,useMemo, useCallback, useRef, useLayoutEffect} from 'react'
import styles from './about.module.scss'
import rigthArrow from '../images/right-arrow.svg'
import { useAsync } from '../hooks/useAsync';
import useAllProducts from '../hooks/useAllProducts';
import { useProducts } from '../hooks/useProducts';
import Carousel from '../components/UI/carousel/Carousel';
import { getCurrentUser } from '../firebase/fireAuthAPI';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrder, setOrderDate } from '../redux/checkoutSlice';
import { expGetModels, expGetProducts } from '../firebase/productFirebaseAPI';
import { useGenerateQuery } from '../hooks/useGenerateQuery';
import { updateObject } from '../utils/objectSort';

export const aboutLoader = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return res.json();
}




const About = () => {
    const [option,setOption] = useState(0)
    const test = {
        age:12,
        name:'Nan'
    }
    const [products,setProducts] = useState([])
    const [isProductsLoadig,setIsProductsLoadig] = useState(false)
    const type = 'shoes';
    const male = 'men'
    const [prodFilter,setProdFilter]=useState({})
    const [modlFilter,setModlFilter]=useState({});
    const prodTriger = Object.keys(prodFilter).length
    const modlTriger = Object.keys(modlFilter).length

    const getProducts = useCallback(()=>{
       setIsProductsLoadig(true);
       setProducts([]);
       const productsQuery = useGenerateQuery("products", prodFilter);
       const modelsQuery = useGenerateQuery("products_models", modlFilter);
       expGetProducts(type,male,productsQuery)
        .then(productsResponse=>{
            const tempProducts= [];
            productsResponse.forEach(item=>{
                const tempProduct = item.data() 
                tempProducts.push({id:item.id,...tempProduct})
            })
            return tempProducts;
        }) 
        .then(products=>{
            // setProducts(products)
            products.forEach(prodItem=>{
                expGetModels(prodItem.id,modelsQuery)
                .then(modelsResponse=>{
                    const tempModels = []
                    modelsResponse.forEach(modelItem=>{
                        const tempModel = modelItem.data()
                        tempModels.push({
                            modelID:modelItem.id,
                            ...prodItem,
                            ...tempModel,
                        })
                    })
                    return tempModels;
                })
                .then(finalResponse=>{
                    setProducts(p=>[...p,...finalResponse])
                })
            })
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
            setIsProductsLoadig(false)
        })
    },[
        type,
        male,
        prodTriger,
        modlTriger
    ])

    useEffect(()=>{
        getProducts()
    },[type,
        male,
        prodTriger,
        modlTriger])
    useEffect(()=>{
        // setProdFilter({category:'Boat Shoes'})
        updateObject('Boat Shoes','category',setProdFilter)
    },[])
    return <div className={styles.about}>
        <div className={styles.content} >
           
            <br />
            <br />
            <button 
                className={styles.btn}
                onClick={()=>{
                   console.log('click')
                }}
            >Settings</button>
            <br />
            <br />
            <br />
            {
                isProductsLoadig==false
                ?products.map((item,index)=><React.Fragment key={index}>
                 <p>
                    {item?.name}
                </p>
                <p>
                    {item?.model_name}
                </p>
                <br />
                <br />
                </React.Fragment>)
                :''
            }
            <br />
            {
                isProductsLoadig==false
                ?<h2><span style={{marginLeft:'100px'}}></span>{products.length}</h2>
                :''
            }
            <br />
            
        </div>
    </div>;
}
 
export default About;