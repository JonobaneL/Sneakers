import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import rigthArrow from '../images/right-arrow.svg'
import { useAsync } from '../hooks/useAsync';
import useAllProducts from '../hooks/useAllProducts';
import { useProducts } from '../hooks/useProducts';
import Carousel from '../components/UI/carousel/Carousel';
import { getCurrentUser } from '../firebase/fireAuthAPI';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrder, setOrderDate } from '../redux/checkoutSlice';
import { useLoaderData } from 'react-router-dom';

export const aboutLoader = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    return res.json();
}


const About = () => {
    const [option,setOption] = useState(0)
    const test = useLoaderData()
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
                <h1>{test.title}</h1>
                <h1>{test.completed}</h1>
           
                <br />
            <br />
            <br />
            
        </div>
    </div>;
}
 
export default About;