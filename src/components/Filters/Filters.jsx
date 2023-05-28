import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from './Filters.module.scss'
import Select from "../UI/select/Select";
import Accordion from "../UI/accordion/Accordion";
import CheckBoxList from "../UI/checkBoxList/CheckBoxList";
import { useNavigate, useParams } from "react-router-dom";
import { getShoesFiltersData } from "../../utils/getShoesData";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import { shoesColor } from "../../data/shoesColor";
import { useFiltered } from "../../hooks/useFilters";
import { shoes } from "../../data/shoes";
import DropDownList from "../UI/dropDownList/dropDownList";
import SizeSelect from "../UI/sizeSelect/SizeSelect";
import filtersIcon from '../../images/filters.png' 
import { useSearch } from "../../hooks/useSearch";
import ClearButton from "../UI/clear-button/ClearButton";
import { AnimatePresence,motion } from "framer-motion";
import closeIcon from '../../images/cancel.svg'

const ACCORDION_STYLES = {
    display:'flex',
    justifyContent:'space-between',
    fontSize:'15px',
    fontWeight:600
}
const FILTERS_SERIALIZE = data => data.join("-");
const FILTERS_DESERIALIZE = data => data?data.split("-"):[];
const Filters = ({setData}) => {
    const [sort,setSort] = useState()
    const windowSize = window.screen.availWidth<=1024;
    const theme = "dark";
    const filtersWrapperVariants = {
        hidden:{
            opacity:0
        },
        visible:{
            opacity:1
        }
    }
    const filtersOptionsVariants = {
        hidden:{
            y:1000,
        },
        visible:{
            y:0
        }
    }
    const {type,male} = useParams()
    const [productCategories,productBrands,productMaterials,productSortParams,productPriceParams,productPercentParams] = getShoesFiltersData(male)
    const [categoryFilters,setCategoryFilters] = useSearchParamsState({name:"category",serialize:(data)=>data.join(">"), deserialize:(data)=>data?data.split(">"):[]})
    const [brandFilters,setBrandFilters] = useSearchParamsState({name:"brand", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [colorFilters,setColorFilters] = useSearchParamsState({name:"color", serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
    const [sizeFilters,setSizeFilters] = useSearchParamsState({name:"size",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [materialFilters,setMaterialFilters] = useSearchParamsState({name:"material",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [priceFilters,setPriceFilters] = useSearchParamsState({name:"price",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [percentFilters,setPercentFilters] = useSearchParamsState({name:"percent",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const filteredData = useFiltered(shoes,male,sort,categoryFilters,brandFilters,colorFilters,priceFilters,percentFilters,sizeFilters,materialFilters)
    const [isFiltersOptionsOpen,setIsFiltersOptionsOpen] = useState(!windowSize);
    const [searchQuery,setSearchQuery] = useState('');
    const searchedBrands = useSearch(productBrands,searchQuery)
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
   
    return <div className={styles.filters}>
        <div className={styles["filters-nav"]}>
            <button 
                className={styles["filters-nav__opener"]}
                onClick={()=>{
                    setIsFiltersOptionsOpen(true);
                    document.body.style.overflowY='hidden'}
                }
            >
                Filter
                <img src={filtersIcon} alt="" />
            </button>
        </div>
        <AnimatePresence initial={false}>
            {
                isFiltersOptionsOpen && <>
                {
                    windowSize && <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={filtersWrapperVariants}
                    transition={{
                       duration:0.4
                    }}
                    className={styles['filters-wrapper']}/>
                }
                    
                    <motion.div 
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={filtersOptionsVariants}
                    transition={{
                        duration:0.4
                    }}
                    className={`${styles["filters-options"]}`}>
                        {
                            windowSize && <button
                            className={styles['close-btn']}
                                onClick={()=>{setIsFiltersOptionsOpen(false);document.body.style.overflowY='unset'}}
                            >
                                <img src={closeIcon} alt="close" />
                            </button>
                        }
                        
                        <Select 
                            placeholder='Sort by'
                            params={productSortParams}
                            getData={(value)=>setSort(value)}
                            disabled={!sort?[1]:[]}
                        />
                        <Accordion 
                            fixed={true}
                            theme={theme}
                            autoHeight={true}
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Category
                                </div>
                            }
                            >
                            <DropDownList 
                                handler={value=>{
                                    setCategoryFilters(value)
                                }}
                                data={productCategories}
                                seleted={categoryFilters}
                            />
                        </Accordion>
                        <Accordion
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Brands
                                    <ClearButton triger={brandFilters.length} handler={()=>setBrandFilters([])}/>
                                </div>
                            }
                        >
                            <CheckBoxList theme={theme} data={searchedBrands} checkedItems={brandFilters} handler={(value)=>setBrandFilters(value)}/>
                        </Accordion>
                        
                        <Accordion header={<div style={ACCORDION_STYLES}>Color</div>}>
                            <CheckBoxList theme={theme} data={shoesColor} handler={(value)=>setColorFilters(value)} checkedItems={colorFilters} colored={true} />
                        </Accordion>
                        <Accordion 
                            fixed={true} 
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Size
                                    <ClearButton triger={sizeFilters.length} handler={()=>setSizeFilters([])}/>
                                </div>
                            }
                            theme={theme} 
                            data={sizeFilters} 
                            handler={()=>{
                                setSizeFilters([])
                            }}
                        >
                            <SizeSelect  choosed={sizeFilters} handler={(size_data)=>setSizeFilters(size_data)} theme={theme} type='multi'/>
                        </Accordion>
                        <Accordion 
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Material
                                    <ClearButton triger={materialFilters.length} handler={()=>setMaterialFilters([])}/>
                                </div>
                            }
                            >
                            <CheckBoxList theme={theme} data={productMaterials} handler={(value)=>setMaterialFilters(value)} checkedItems={materialFilters} />
                        </Accordion>
                        <Accordion  
                            autoHeight={true}
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Price
                                    <ClearButton triger={priceFilters.length} handler={()=>setPriceFilters([])}/>
                                </div>
                            }
                            >
                            <CheckBoxList theme={theme} data={productPriceParams} handler={(value)=>setPriceFilters(value)} checkedItems={priceFilters} />
                        </Accordion>
                        <Accordion
                            autoHeight={true}
                            header={
                                <div style={ACCORDION_STYLES}>
                                    Percent Off
                                    <ClearButton triger={percentFilters.length} handler={()=>setPercentFilters([])}/>
                                </div>
                            }
                        >
                            <CheckBoxList theme={theme} data={productPercentParams} handler={(value)=>setPercentFilters(value)} checkedItems={percentFilters} />
                        </Accordion>
                        <div className={styles["button-bar"]}>
                            <button className={styles['button-bar__clear']} onClick={()=>clearEvent()}>Clear</button>
                            <button onClick={()=>setIsFiltersOptionsOpen(false)} className={styles['button-bar__view']}>View results ({filteredData.length})</button>
                        </div>
                    </motion.div>
                
                </>
            }
           
        </AnimatePresence>
        
         
    </div>;
};
 
export default Filters;