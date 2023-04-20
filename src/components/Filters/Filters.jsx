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
import DropDownList from "../UI/dropDownList/dropDownList";
import SizeSelect from "../UI/sizeSelect/SizeSelect";
import filtersIcon from '../../images/filters.png' 
import { useSearch } from "../../hooks/useSearch";


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
const Filters = ({setData}) => {
    const [sort,setSort] = useState('')
    const windowSize = window.screen.availWidth;
    const theme = windowSize>1024?"dark":"white";
    const {type,male} = useParams()
    const [shoesCategories,shoesBrands,shoesMaterial] = getShoesFiltersData(male)
    const [categoryFilters,setCategoryFilters] = useSearchParamsState({name:"category",deserialize:(data)=>data?data:""})
    const [brandFilters,setBrandFilters] = useSearchParamsState({name:"brand", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [colorFilters,setColorFilters] = useSearchParamsState({name:"color", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [sizeFilters,setSizeFilters] = useSearchParamsState({name:"size",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [materialFilters,setMaterialFilters] = useSearchParamsState({name:"material",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [priceFilters,setPriceFilters] = useSearchParamsState({name:"price",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [percentFilters,setPercentFilters] = useSearchParamsState({name:"percent",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const filteredData = useFiltered(shoes,male,brandFilters,colorFilters,priceFilters,percentFilters,sizeFilters,materialFilters)
    const [isFiltersOptionsOpen,setIsFiltersOptionsOpen] = useState(false);
    const [searchQuery,setSearchQuery] = useState('');
    const searchedBrands = useSearch(shoesBrands,searchQuery)
    const navigate = useNavigate()

    useEffect(()=>{
        setData(filteredData)
    },[filteredData])

    const clearEvent = ()=>{
        setCategoryFilters([]);
        setBrandFilters([]);
        setColorFilters([]);
        setSizeFilters([]);
        setMaterialFilters([]);
        setPriceFilters([]);
        setPercentFilters([]);
        navigate({search:''})
    }
    console.log(categoryFilters)
    return <div className={styles.filters}>
        <div className={styles["filters-nav"]}>
            <button 
                className={styles["filters-nav__opener"]}
                onClick={()=>setIsFiltersOptionsOpen(prev=>!prev)}
            >
                <img src={filtersIcon} alt="" />
                Filter
            </button>
                <div className={styles.select}>
                    <Select
                        placeholder='Sort by'
                        params={SORT_PARAMS}
                        getData={(value)=>setSort(value)}
                    />
                </div>
        </div>
        <div className={`${styles["filters-options"]} ${isFiltersOptionsOpen?styles.active:''}`}>
            <div style={{display:windowSize<1024?'none':'block'}}>
                <Select 
                    placeholder='Sort by'
                    params={SORT_PARAMS}
                    getData={(value)=>setSort(value)}
                />
            </div>
            <Accordion fixed={true} title={"Category"} theme={theme} autoheight={true}>
                <DropDownList 
                    handler={value=>{
                        setCategoryFilters(value)
                    }}
                    data={shoesCategories}
                />
            </Accordion>
            <Accordion data={[]} title={"Brands"} theme={theme} searchField={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
                <CheckBoxList theme={theme} data={searchedBrands} checkedItems={brandFilters} handler={(value)=>setBrandFilters(value)}/>
            </Accordion>
            <Accordion theme={theme} title="Color" data={[]}>
                <CheckBoxList theme={theme} data={shoesColor} handler={(value)=>setColorFilters(value)} checkedItems={colorFilters} colored={true} />
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
            <Accordion title="Material" data={[]} theme={theme} >
                <CheckBoxList theme={theme} data={shoesMaterial} handler={(value)=>setMaterialFilters(value)} checkedItems={materialFilters} />
            </Accordion>
            <Accordion  
                title="Price"
                data={priceFilters} 
                theme={theme}
                >
                <CheckBoxList theme={theme} data={PRICE_PARAMS} handler={(value)=>setPriceFilters(value)} checkedItems={priceFilters} />
            </Accordion>
            <Accordion
                title="Percent Off"
                data={percentFilters} 
                theme={theme}
            >
                <CheckBoxList theme={theme} data={PERCENT_PARAMS} handler={(value)=>setPercentFilters(value)} checkedItems={percentFilters} />
            </Accordion>
            <div className={styles["button-bar"]}>
                <p className={styles['button-bar__clear']} onClick={()=>clearEvent()}>Clear filters</p>
                <button onClick={()=>setIsFiltersOptionsOpen(false)} className={styles['button-bar__view']}>View results ({filteredData.length})</button>
            </div>
        </div>
        
    </div>;
};
 
export default Filters;