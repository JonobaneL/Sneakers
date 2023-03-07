import React,{useState} from 'react';
import DropDownList from '../UI/dropDownList/dropDownList';
import Select from '../UI/select/Select';
import styles from './Filters.module.scss'
import Accordion from '../UI/accordion/Accordion';
import CheckBox from '../UI/checkBox/CheckBox';
import { getMenBrands } from '../../utils/getBrands';
const Filters = () => {
    const data = getMenBrands();
    const sortParams = [
        {id:1,value:'Top Rated'},
        {id:2,value:'Newest'},
        {id:3,value:'Price: High to Low'},
        {id:4,value:'Price: Low to High'},
        {id:5,value:'Percent Off'},
    ]
    const [filters,setFilters]=useState({sort:'',categoty:''})
    return (
        <div className={styles.filters}>
            <Select
                placeholder='Sort by'
                params={sortParams}
                getData={value=>{console.log(value);setFilters({...filters,sort:value})}}
            />
            <DropDownList getData={value=>{console.log(value);setFilters({...filters,categoty:value})}}/>
            <Accordion width='180px' title={"Brands"} content={<CheckBox data={data}/>}/>
        </div>
    );
};


export default Filters;