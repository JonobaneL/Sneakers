import React,{useState} from 'react';
import DropDownList from '../UI/dropDownList/dropDownList';
import Select from '../UI/select/Select';
import Accordion from '../UI/accordion/Accordion';
import CheckBox from '../UI/checkBox/CheckBox';
import {shoesColor} from '../../data/shoesColor'
import filtersIcon from '../../images/filters.png' 
import styles from './Filters.module.scss'
import SizeList from '../UI/sizeList/SizeList';

const Filters = ({data}) => {
    const sortParams = [
        {id:1,value:'Top Rated'},
        {id:2,value:'Newest'},
        {id:3,value:'Price: High to Low'},
        {id:4,value:'Price: Low to High'},
        {id:5,value:'Percent Off'},
    ]
    const priceParams = [
        {id:1,name:"Under $30"},
        {id:2,name:"$30 to $50"},
        {id:3,name:"$50 to $75"},
        {id:4,name:"$75+"},
    ]
    const percentOffParams = [
        {id:1,name:"Up to 30%"},
        {id:2,name:"30% to 50%"},
        {id:3,name:"50%+"},
    ]
    const [filters,setFilters]=useState({sort:'',categoty:''})
    return (
        <div className={styles.filters}>
            <div className={styles["filters-navigation"]}>
                <button className={styles["filters-navigation__opener"]}>
                    <img src={filtersIcon} alt="" />
                    Filter
                </button>
                <div className={styles.select}>
                    <Select
                        placeholder='Sort by'
                        params={sortParams}
                        getData={value=>{console.log(value);setFilters({...filters,sort:value})}}
                    />
                </div>
            </div>
            <div className={styles["filters-options"]}>
                <div className={styles.select}>
                <Select
                        placeholder='Sort by'
                        params={sortParams}
                        getData={value=>{console.log(value);setFilters({...filters,sort:value})}}
                    />
                </div>
                <DropDownList 
                    getData={value=>{
                        console.log(value);
                        setFilters({...filters,categoty:value})
                    }}
                    data={data.shoesCategories}
                />
                <Accordion width='100%' title={"Brands"} >
                    <CheckBox data={data.shoesBrands}/>
                </Accordion>
                <Accordion width='100%' title={"Color"} >
                    <CheckBox data={shoesColor}/>
                </Accordion>
                <Accordion fixed={true} width='100%' title={"Size"} >
                    <SizeList/>
                </Accordion>
                <Accordion width='100%' title={"Material"} >
                    <CheckBox data={data.shoesMaterial}/>
                </Accordion>
                <Accordion width='100%' title={"Price"} >
                    <CheckBox data={priceParams}/>
                </Accordion>
                <Accordion width='100%' title={"Percent Off"} >
                    <CheckBox data={percentOffParams}/>
                </Accordion>
            </div>
        </div>
    );
};


export default Filters;