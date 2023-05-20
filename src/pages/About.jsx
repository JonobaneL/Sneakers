import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import Accrodion from '../components/UI/accordionV2/AccordionV2';
import CheckBoxList from '../components/UI/checkBoxList/CheckBoxList';
import { shoesBrands } from '../data/shoesBrands';

const About = () => {
    const [brandFilters,setBrandFilters] = useState([])
    return <div className={styles.about}>
        <div className={styles.content} >
         <Accrodion
         fixed={true}
            header={
                <div style={{display:'flex',gap:'10px',justifyContent:'space-between',paddingRight:'10px'}}>
                    <p>Some title</p>
                    <a href="#">Clear</a>
                </div>
            }
         >
           <CheckBoxList theme="dark" data={shoesBrands} checkedItems={brandFilters} handler={(value)=>setBrandFilters(value)}/>
         </Accrodion>
        </div>
    </div>;
}
 
export default About;