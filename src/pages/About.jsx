import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { groupByObject } from '../utils/objectSort';
import RadioList from '../components/RadioList/RadioList';
import Select from '../components/UI/select/Select';
const About = () => {
    const [option,setOption] = useState('')
    const arr = [
        {id:'1',value:`opt1`},
        {id:'2',value:`opt4`},
        {id:'3',value:`opt3`},
        {id:'4',value:`opt2`},
    ]
    // productsAmount()
    return <div className={styles.about}>
        <div className={styles.content} >
            <button
                onClick={()=>{
                    console.log(option)
                }}
            >Open</button>
             <RadioList 
                list={[
                    {id:'opt1',label:'Pickup from Ukrposhta',value:'Ukr Poshta1',disabled:false},
                    {id:'opt2',label:'Courier Ukrposhta',value:'Ukr Poshta2',disabled:false},
                    {id:'opt3',label:'Pickup from Nova Poshta',value:'Nova Poshta1',disabled:false},
                    {id:'opt4',label:'Courier Nova Poshta',value:'Nova Poshta2',disabled:false},
                ]}
                groupName='shipping'
                callback={value=>setOption(value.slice(0,-1))}
            >
                <>
                <Select placeholder='Select a post office'
                        getData={(val)=>console.log(val)}
                        params={arr}
                        type='borderType'
                        height='45px'
                    />
                </>
                <>
                    <h2>Option 2</h2>
                </>
                <>
                    <h2>Option 3</h2>
                </>
                <>
                    <h2>Option 4</h2>
                </>
            </RadioList>
        
        </div>
    </div>;
}
 
export default About;