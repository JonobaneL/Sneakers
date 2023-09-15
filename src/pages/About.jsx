import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { groupByObject } from '../utils/objectSort';
import RadioList from '../components/RadioList/RadioList';
import Select from '../components/UI/select/Select';
import { some } from '../firebase/productFirebaseAPI';
import { useInput } from '../hooks/useInput';
import ValidationErrorMessages from '../components/ValidationErrorMessages/ValidationErrorMessages';
import CInput from '../components/UI/input/CInput';
import Autocomplete from '../components/UI/autocomplete/Autocomplete';
import { findLocation } from '../utils/searchLocation';
const About = () => {
    const [option,setOption] = useState('')
    const arr = [
        {id:'1',value:`opt1`},
        {id:'2',value:`opt4`},
        {id:'3',value:`opt3`},
        {id:'4',value:`opt2`},
        {id:'5',value:`opt2`},
        {id:'6',value:`opt2`},
        {id:'7',value:`opt2`},
    ]
    const city = useInput('',{isEmpty:true})
    const locationResponse = findLocation(city.value)
    console.log(locationResponse)

    return <div className={styles.about}>
        <div className={styles.content} >
            <button
                onClick={()=>{
                    setOption(true)
                }}
            >Open</button>
            <br />
            <br />
            <br />
            <ValidationErrorMessages durty={city.isDurty} errorMessages={city.currentErrors}>
                <Autocomplete data={locationResponse} query={city.value} setQuery={city.setValue} >
                    <CInput  
                        value={city.value} 
                        onChange={e=>city.onChange(e)} 
                        id="location" 
                        mode='fullBorder'
                        onBlur={e => city.onBlur(e)}
                        height={50}
                        placeholder="Enter your city"
                        valid={city.isDurty && city.currentErrors.length>0}

                        />
                </Autocomplete>
            </ValidationErrorMessages>
        
        </div>
    </div>;
}
 
export default About;