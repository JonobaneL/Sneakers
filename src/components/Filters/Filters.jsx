import React, {memo} from 'react';
import DropDownList from '../UI/dropDownList/dropDownList';
import Select from '../UI/select/Select';
import Accordion from '../UI/accordion/Accordion';
import {shoesColor} from '../../data/shoesColor'
import filtersIcon from '../../images/filters.png' 
import styles from './Filters.module.scss'
import SizeSelect from '../UI/sizeSelect/SizeSelect';
import CheckBoxList from '../UI/checkBoxList/CheckBoxList';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShoesFiltersData } from '../../utils/getShoesData';
import { useFiltered } from '../../hooks/useFilters';
import { shoes } from '../../data/shoes';

const FILTERS_SERIALIZE = data => data.join("-");
const FILTERS_DESERIALIZE = data => data?data.split("-"):[];
    
//виправити роботу сраних фільтрів

const Filters = memo(({filters,setFilters,numberOfProducts}) => {
    console.log("render filters")
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
    const {type} = useParams();
    const [shoesCategories,shoesBrands,shoesMaterial] = getShoesFiltersData(type)
    const [brandFilters,setBrandFilters] = useSearchParamsState({name:"brand", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [colorFilters,setColorFilters] = useSearchParamsState({name:"color", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [sizeFilters,setSizeFilters] = useSearchParamsState({name:"size",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [materialFilters,setMaterialFilters] = useSearchParamsState({name:"material",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [priceFilters,setPriceFilters] = useSearchParamsState({name:"price",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [percentFilters,setPercentFilters] = useSearchParamsState({name:"percent",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const navigate = useNavigate()
  
    useEffect(()=>{
        console.log("end effect")
        setFilters({
            brands:brandFilters,
            colors:colorFilters,
            size:sizeFilters,
            materials:materialFilters,
            price:priceFilters,
            percent:percentFilters
        })
        console.log(fil)
        console.log("brand",brandFilters)
    },[brandFilters,colorFilters,sizeFilters,materialFilters,priceFilters,percentFilters,type])
    const clearEvent =()=>{
        setBrandFilters([])
        setColorFilters([])
        setSizeFilters([])
        setMaterialFilters([])
        setPriceFilters([])
        setPercentFilters([])
        navigate({search:''})
    }
    const fil = useFiltered(shoes,type,brandFilters);

   
   
    const [isFiltersOptionsOpen,setIsFiltersOptionsOpen] = useState(false);
    const theme = window.screen.availWidth<1024?"white":"dark"
    return (
        <div className={styles.filters}>
            <div className={styles["filters-navigation"]}>
                <button 
                    className={styles["filters-navigation__opener"]}
                    onClick={()=>setIsFiltersOptionsOpen(prev=>!prev)}
                >
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
            <div className={`${styles["filters-options"]} ${isFiltersOptionsOpen?styles.active:''}`}>
                <div className={styles.select}>
                <Select
                        placeholder='Sort by'
                        params={sortParams}
                        getData={value=>{console.log(value);setFilters({...filters,sort:value})}}
                    />
                </div>
                <Accordion fixed={true} title={"Category"} theme={theme} autoheight={true}>
                    <DropDownList 
                        getData={value=>{
                            console.log(value);
                            setFilters({...filters,category:value})
                        }}
                        data={shoesCategories}
                    />
                </Accordion>
                
                <Accordion  
                    title="Brands" 
                    data={brandFilters}
                    theme={theme} 
                    handler={()=>{
                        setBrandFilters([])
                    }}>
                    <CheckBoxList data={shoesBrands} handler={(item)=>setBrandFilters(item)} checkedItems={brandFilters} />
                </Accordion>
                <Accordion
                    title="Color"
                    data={filters.colors}
                    theme={theme} 
                    handler={()=>{
                        setColorFilters([])
                    }}
                    >
                    <CheckBoxList data={shoesColor} handler={(item)=>setColorFilters(item)} checkedItems={colorFilters} colored={true} />
                </Accordion>
                <Accordion 
                    fixed={true} 
                    title="Size"
                    theme={theme} 
                    data={sizeFilters} 
                    handler={()=>{
                        setSizeFilters([])
                    }}
                >
                    <SizeSelect  choosed={sizeFilters} handler={(size_data)=>setSizeFilters(size_data)} theme={theme} type='multi'/>
                </Accordion>
                <Accordion
                    title="Material"
                    data={materialFilters} 
                    theme={theme} 
                    handler={()=>{
                        setMaterialFilters([])
                    }}
                    >
                    <CheckBoxList data={shoesMaterial} handler={(item)=>setMaterialFilters(item)} checkedItems={materialFilters} />
                </Accordion>
                <Accordion  
                    title="Price"
                    data={priceFilters} 
                    theme={theme} 
                    handler={()=>{
                        setPriceFilters([])
                    }}
                    >
                    <CheckBoxList data={priceParams} handler={(item)=>setPriceFilters(item)} checkedItems={priceFilters} />
                </Accordion>
                <Accordion
                    title="Percent Off"
                    data={percentFilters} 
                    theme={theme} 
                    handler={()=>{
                        setPercentFilters([])
                    }}
                    >
                    <CheckBoxList data={percentOffParams} handler={(item)=>setPercentFilters(item)} checkedItems={percentFilters} />
                </Accordion>
                <div className={styles['button-bar']}>
                    <p className={styles['button-bar__clear']} onClick={()=>clearEvent()}>Clear filters</p>
                    <button onClick={()=>setIsFiltersOptionsOpen(false)} className={styles['button-bar__view']}>View results ({numberOfProducts})</button>
                </div>
            </div>
        </div>
    );
});


export default Filters;