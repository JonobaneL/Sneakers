import React from 'react';
import DropDownList from '../UI/dropDownList/dropDownList';
import Select from '../UI/select/Select';
import Accordion from '../UI/accordion/Accordion';
import {shoesColor} from '../../data/shoesColor'
import filtersIcon from '../../images/filters.png' 
import styles from './Filters.module.scss'
import SizeSelect from '../UI/sizeSelect/SizeSelect';
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
                    data={filters.brands} 
                    handler={()=>{
                        setFilters({...filters,brands:[]})
                    }}>
                    <CheckBoxList data={data.shoesBrands} handler={(item)=>setFilters({...filters,brands:item})} checkedItems={filters.brands} />
                </Accordion>
                <Accordion
                    title="Color"
                    data={filters.colors} 
                    handler={()=>{
                        setFilters({...filters,colors:[]})
                    }}
                    >
                    <CheckBoxList data={shoesColor} handler={(item)=>setFilters({...filters,colors:item})} checkedItems={filters.colors} colored={true} />
                </Accordion>
                <Accordion 
                    fixed={true} 
                    title="Size"
                    data={filters.size} 
                    handler={()=>{
                        setFilters({...filters,size:[]})
                    }}
                >
                    <SizeSelect choosed={filters.size} handler={(size_data)=>setFilters({...filters,size:size_data})} type='multi'/>
                </Accordion>
                <Accordion
                    title="Material"
                    data={filters.materials} 
                    handler={()=>{
                        setFilters({...filters,materials:[]})
                    }}
                    >
                    <CheckBoxList data={data.shoesMaterial} handler={(item)=>setFilters({...filters,materials:item})} checkedItems={filters.materials} />
                </Accordion>
                <Accordion  
                    title="Price"
                    data={filters.price} 
                    handler={()=>{
                        setFilters({...filters,price:[]})
                    }}
                    >
                    <CheckBoxList data={priceParams} handler={(item)=>setFilters({...filters,price:item})} checkedItems={filters.price} />
                </Accordion>
                <Accordion
                    title="Percent Off"
                    data={filters.percent} 
                    handler={()=>{
                        setFilters({...filters,percent:[]})
                    }}
                    >
                    <CheckBoxList data={percentOffParams} handler={(item)=>setFilters({...filters,percent:item})} checkedItems={filters.percent} />
                </Accordion>
            </div>
        </div>
    );
};


export default Filters;