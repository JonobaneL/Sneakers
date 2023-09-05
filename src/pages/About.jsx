import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { groupByObject } from '../utils/objectSort';
const About = () => {
    const orders = [
        {   
            orderID:'order1',
            userName:'andri',
            sortDate:'September 2023',
            cart:[]
        },
        {   
            orderID:'order2',
            userName:'max',
            sortDate:'October 2023',
            cart:[]
        },
        {   
            orderID:'order3',
            userName:'petro',
            sortDate:'September 2023',
            cart:[]
        },
        {   
            orderID:'order4',
            userName:'andri',
            sortDate:'August 2023',
            cart:[]
        },
    ]
    console.log(groupByObject(orders,'sortDate'))
    const ordersRes = groupByObject(orders,'sortDate')
    useEffect(()=>{
        const data = [
            {
                name:'Andri',
                lastName:'Fedun'
            },
            {
                name:'Andri1',
                lastName:'Fedun2'
            },
            {
                name:'Andri2',
                lastName:'Fedun1'
            },
    ];
        localStorage.removeItem('user')

    },[])

    return <div className={styles.about}>
        <div className={styles.content} >
            <button
                onClick={()=>{
                    // console.log(JSON.parse(localStorage.getItem('user')))
                }}
            >Open</button>
            {
                Object.keys(ordersRes).map((key,index)=>{
                    return <div key={index}>
                        <h2>{key}</h2>
                        <ul>
                            {
                                ordersRes[key].map((item,itemIndex)=>{
                                    return <li key={itemIndex}>{item.orderID}</li>
                                })
                            }
                        </ul>
                    </div>
                })
            }
            
        
        </div>
    </div>;
}
 
export default About;