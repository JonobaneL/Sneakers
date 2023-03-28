import React,{useState} from 'react';
import DropDownList from '../UI/dropDownList/dropDownList';
import Select from '../UI/select/Select';
import Accordion from '../UI/accordion/Accordion';
import {shoesColor} from '../../data/shoesColor'
import filtersIcon from '../../images/filters.png' 
import styles from './Filters.module.scss'
import SizeList from '../UI/sizeList/SizeList';
import CheckBoxList from '../UI/checkBoxList/CheckBoxList';

const Filters = ({filters,setFilters,data}) => {
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
                <Accordion fixed={true} title={"Category"} autoheight={true}>
                    <DropDownList 
                        getData={value=>{
                            console.log(value);
                            setFilters({...filters,category:value})
                        }}
                        data={data.shoesCategories}
                    />
                </Accordion>
                
                <Accordion  
                    title="Brands" 
                    clearTriger={filters.brands.length>0?true:false} 
                    clearHandler={(event)=>{
                        console.log(event)
                        window.scrollTo(0,0)
                        setFilters({...filters,brands:[]})
                    }}>
                    <CheckBoxList filtersChange={(items)=>setFilters({...filters,brands:items})} data={data.shoesBrands}/>
                </Accordion>
                <Accordion  title="Color" >
                    <CheckBoxList filtersChange={(items)=>setFilters({...filters,colors:items})} data={shoesColor} colored={true}/>
                </Accordion>
                <Accordion fixed={true} title="Size">
                    <SizeList filtersChange={(items)=>setFilters({...filters,size:items})}/>
                </Accordion>
                <Accordion  title="Material" >
                    <CheckBoxList filtersChange={(items)=>setFilters({...filters,materials:items})} data={data.shoesMaterial}/>
                </Accordion>
                <Accordion  title="Price" >
                    <CheckBoxList filtersChange={(items)=>setFilters({...filters,price:items})} data={priceParams}/>
                </Accordion>
                <Accordion  title="Percent Off" >
                    <CheckBoxList filtersChange={(items)=>setFilters({...filters,percent:items})} data={percentOffParams}/>
                </Accordion>
            </div>
        </div>
    );
};


export default Filters;