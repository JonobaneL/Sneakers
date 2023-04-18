import React, { memo, useCallback, useEffect, useState } from "react";
import styles from './Filters.module.scss'
import Select from "../UI/select/Select";
import Accordion from "../UI/accordion/Accordion";
import CheckBoxList from "../UI/checkBoxList/CheckBoxList";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getShoesFiltersData } from "../../utils/getShoesData";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import { shoesColor } from "../../data/shoesColor";
import { useFiltered } from "../../hooks/useFilters";
import { shoes } from "../../data/shoes";
import { useLatest } from "../../hooks/useLatest";

const SORT_PARAMS = [
    {id:1,value:'Top Rated'},
    {id:2,value:'Newest'},
    {id:3,value:'Price: High to Low'},
    {id:4,value:'Price: Low to High'},
    {id:5,value:'Percent Off'},
]
const PRICE_PARAMS = [
    {id:1,name:"Under $30"},
    {id:2,name:"$30 to $50"},
    {id:3,name:"$50 to $75"},
    {id:4,name:"$75+"},
]
const PERCENT_PARAMS = [
    {id:1,name:"Up to 30%"},
    {id:2,name:"30% to 50%"},
    {id:3,name:"50%+"},
]
const FILTERS_SERIALIZE = data => data.join("-");
const FILTERS_DESERIALIZE = data => data?data.split("-"):[];
const Filters1 = ({setData}) => {
    const [sort,setSort] = useState('')

    const {type,male} = useParams()
    const [shoesCategories,shoesBrands,shoesMaterial] = getShoesFiltersData(male)
    const [brandFilters,setBrandFilters] = useSearchParamsState({type:male,name:"brand", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [colorFilters,setColorFilters] = useSearchParamsState({type:male,name:"color", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [sizeFilters,setSizeFilters] = useSearchParamsState({type:male,name:"size",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [materialFilters,setMaterialFilters] = useSearchParamsState({type:male,name:"material",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [priceFilters,setPriceFilters] = useSearchParamsState({type:male,name:"price",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [percentFilters,setPercentFilters] = useSearchParamsState({type:male,name:"percent",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
  const filteredData = useFiltered(shoes,male,brandFilters)
    
  useEffect(()=>{
        setData(filteredData)
    },[filteredData])
    console.log(brandFilters)
    return <div className={styles.filters}>
        <Select 
            placeholder='Sort by'
            params={SORT_PARAMS}
            getData={(value)=>setSort(value)}
        />
        <Accordion data={[]} title={"Brands"}>
            <CheckBoxList data={shoesBrands} checkedItems={brandFilters} handler={(value)=>setBrandFilters(value)}/>
        </Accordion>
        <Accordion title="Color" data={[]}>
            <CheckBoxList data={shoesColor} handler={(value)=>setColorFilters(value)} checkedItems={colorFilters} colored={true} />
        </Accordion>
        <Accordion title="Material" data={[]} >
            <CheckBoxList data={shoesMaterial} handler={(value)=>setMaterialFilters(value)} checkedItems={materialFilters} />
        </Accordion>
        <Accordion  
            title="Price"
            data={priceFilters} 
            >
            <CheckBoxList data={PRICE_PARAMS} handler={(value)=>setPriceFilters(value)} checkedItems={priceFilters} />
        </Accordion>
        <Accordion
            title="Percent Off"
            data={percentFilters} 
        >
            <CheckBoxList data={PERCENT_PARAMS} handler={(value)=>setPercentFilters(value)} checkedItems={percentFilters} />
        </Accordion>
    </div>;
};
 
export default Filters1;