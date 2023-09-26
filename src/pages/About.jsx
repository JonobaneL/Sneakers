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
const About = () => {
    const [option,setOption] = useState(0)
    const dispatch = useDispatch();
    const checkout = useSelector(state=>state.checkoutReducer);
    console.log(checkout)
    const handler = async (uid)=>{
        try{
            const userResponse = await getCurrentUser('EOmwDcL6GUWJuwxApsj2oeylk2r1')
            console.log(userResponse.data())
            if(!userResponse.data()){
                throw new Error('');
            }
        }catch(err){
            console.log(err);
        }
    }
    return <div className={styles.about}>
        <div className={styles.content} >
           
            <br />
            <br />
            <button 
                className={styles.btn}
                onClick={()=>{
                    dispatch(setOrderDate({
                        sortDate:'12/2023',
                        date:'23/12/2023'   
                    }))
                }}
            >Settings</button>
            <br />
            <br />
            <br />
             <button 
                className={styles.btn}
                onClick={()=>{
                    dispatch(resetOrder())
                }}
            >Reset</button>
           
           
                <br />
            <br />
            <br />
            
        </div>
    </div>;
}
 
export default About;