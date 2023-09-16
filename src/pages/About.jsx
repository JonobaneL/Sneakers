import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'

import { useAsync } from '../hooks/useAsync';
import useAllProducts from '../hooks/useAllProducts';
import { useProducts } from '../hooks/useProducts';
const About = () => {
    const [option,setOption] = useState('')
    const [isProductsLoading,porductsError,productsResponse] = useAllProducts('shoes','men',{},{
        color:['Black']
    })
    
    const filters = {
        // category:undefined,
        // brand:['Nike','Sperry'],

    }
    // const generateQuery = async(filters)=>{
    //     let productsRef = collection(firebaseDB,'products')
    //     if(!Object.keys(filters).length) return 
    //     Object.keys(filters).forEach(item=>{
    //         if(typeof filters[item] === 'string'){
    //             productsRef = query(productsRef,where(item,'==',filters[item]))
    //         }else{
    //             productsRef = query(productsRef,where(item,'in',filters[item]))
    //         }
    //         console.log(item)
    //     })
    //     try{
    //         const response = await expGetProduct(productsRef);
    //         response.forEach(item=>console.log(item.data()))
    //     }catch(err){
    //         console.log(err)
    //     }
    // }
    const [test,testLoading,testError] = useProducts('shoes','men',{
        brand:'Sperry'
    },{})

    return <div className={styles.about}>
        <div className={styles.content} >
            <button
                onClick={()=>{
                    // setOption(true)
                    // generateQuery(filters)
                    console.log(test)
                    // console.log(productsResponse)
                }}
            >Open</button>
            <br />
            <br />
            <br />

        </div>
    </div>;
}
 
export default About;