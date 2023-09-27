import React, { useCallback, useEffect, useState } from "react";
import styles from './Filters.module.scss'
import Select from "../UI/select/Select";
import Accordion from "../UI/accordion/Accordion";
import Button from "../UI/button/Button";
import CheckBoxList from "../UI/checkBoxList/CheckBoxList";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParamsState } from "../../hooks/useSearchParamsState";
import { shoesColor } from "../../data/shoesColor";
import { useFiltered } from "../../hooks/useFilters";
import DropDownList from "../UI/dropDownList/dropDownList";
import SizeSelect from "../UI/sizeSelect/SizeSelect";
import filtersIcon from '../../images/filters.png' 
import { useSearch } from "../../hooks/useSearch";
import ClearButton from "../UI/clear-button/ClearButton";
import { AnimatePresence,motion } from "framer-motion";
import closeIcon from '../../images/cancel.svg'
import { Search } from "../UI/search/Search";
import { productsFilterParrams } from "../../utils/productsFilters";
import {sizeList} from '../../data/sizeList'

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


const FILTERS_SERIALIZE = data => data.join("-");
const FILTERS_DESERIALIZE = data => data?data.split("-"):[];



const Filters = ({setData,loading,productsLength,onChangeProductFilter,onChangeModelFilter,onChangeFilter}) => {
    const [sort,setSort] = useState()
    const windowSize = window.screen.availWidth<=1024;
    
    const {type,male} = useParams()
    const {categories,brands,materials,sort_params,price_params,percent_params} = productsFilterParrams(male)
    const [categoryFilters,setCategoryFilters] = useSearchParamsState({name:"category",serialize:(data)=>data.join(">"), deserialize:(data)=>data?data.split(">"):[]})
    const [brandFilters,setBrandFilters] = useSearchParamsState({name:"brand", serialize:(data)=>data.join("-"), deserialize:FILTERS_DESERIALIZE})
    const [colorFilters,setColorFilters] = useSearchParamsState({name:"color", serialize:(data)=>data.join("-"), deserialize:FILTERS_DESERIALIZE})
    const [sizeFilters,setSizeFilters] = useSearchParamsState({name:"size",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [materialFilters,setMaterialFilters] = useSearchParamsState({name:"material",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [priceFilters,setPriceFilters] = useSearchParamsState({name:"price",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
    const [percentFilters,setPercentFilters] = useSearchParamsState({name:"percent",serialize:FILTERS_SERIALIZE,deserialize:FILTERS_DESERIALIZE})
   
    const [isFiltersOptionsOpen,setIsFiltersOptionsOpen] = useState(!windowSize);
    const [searchQuery,setSearchQuery] = useState('');
    const searchedBrands = useSearch(brands,searchQuery,'name')
    const navigate = useNavigate()

    ///products filters
    const [productsFilter,setProductsFilter]= useState({})
    const [modelsFilter,setModelsFilter]= useState({})
    useEffect(()=>{
        // console.log(productsFilter)
        // console.log(modelsFilter)
        // console.log('Filters catgory',productsFilter)
        onChangeFilter({
            category:categoryFilters[0],
            sub_category:categoryFilters[1],
            // brand:brandFilters,
        },{})
    },[productsFilter,modelsFilter])
    const filterConfig = (name,filter,type='product')=>{
        // console.log(name,filter)
        if(filter?.length===0){
          if(type==='product'){
            const tempCopy = {...productsFilter};
            delete tempCopy[name]
            setProductsFilter(tempCopy)
          }else if(type==='model'){
            const tempCopy = {...productsFilter};
            delete tempCopy[name]
            setModelsFilter(tempCopy)
          }
        }else{
            if(type==='product'){
              setProductsFilter(p=>{return {...p,[name]:filter}})
            }else if(type==='model'){
              setModelsFilter(p=>{return {...p,[name]:filter}})
            }
        }
        
      }
   ///-end
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
            <Button 
                mode='secondary' 
                width="100px" 
                height="30px" 
                onClick={()=>{
                    setIsFiltersOptionsOpen(true);
                    document.body.style.overflowY='hidden'}
                }
            >
                <div className={styles["filters-nav__opener"]}>
                    Filter
                    <img src={filtersIcon} alt="" />
                </div>
            </Button>
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
                            params={sort_params}
                            getData={(value)=>setSort(value)}
                            disabled={!sort?[1]:[]}
                        />
                        <Accordion 
                            fixed={true}
                            autoHeight={true}
                            header={
                                <div className={styles.accordion}>
                                    Category
                                </div>
                            }
                        >
                            <DropDownList 
                                handler={value=>{
                                    // console.log('drop value',value)
                                    setCategoryFilters(value)
                                    // if(value.length==0){
                                    //     filterConfig('category',[],'product')
                                    //     console.log('onClick',productsFilter)
                                    //     filterConfig('sub_category',[],'product')
                                    // }else if(value.length===1){
                                    //     filterConfig('category',value[0],'product')
                                    // }else{
                                    //     filterConfig('category',value[0],'product')
                                    //     filterConfig('sub_category',value[1],'product')
                                    // }
                                }}
                                data={categories}
                                seleted={categoryFilters}
                            />
                            
                        </Accordion>
                        <Accordion
                            header={
                                <div className={styles.accordion}>
                                    Brands
                                    <ClearButton triger={brandFilters.length} handler={()=>{
                                        setBrandFilters([])
                                // onChangeFilter('brand',[],'product')
                                filterConfig('brand',[],'product')

                                        
                                        }}/>
                                </div>
                            }
                        >
                            <Search initial={searchQuery} onChange={setSearchQuery}/>
                            <br/>
                            <CheckBoxList data={searchedBrands} checkedItems={brandFilters} handler={(value)=>{
                                setBrandFilters(value)
                                // onChangeFilter('brand',value,'product')
                                filterConfig('brand',value,'product')
                                }}/>
                        </Accordion>
                        
                        <Accordion 
                            header={
                                <div className={styles.accordion}>
                                    Color
                                    <ClearButton triger={colorFilters.length} handler={()=>setColorFilters([])}/>
                                </div>}
                        >
                            <CheckBoxList data={shoesColor} handler={(value)=>setColorFilters(value)} checkedItems={colorFilters} colored={true} />
                        </Accordion>
                        {
                            type=='accessories'
                            ?null
                            :<Accordion 
                                fixed={true} 
                                header={
                                    <div className={styles.accordion}>
                                        Size
                                        <ClearButton triger={sizeFilters.length} handler={()=>setSizeFilters([])}/>
                                    </div>
                                }
                                autoHeight={true}
                                handler={()=>{
                                    setSizeFilters([])
                                }}
                            >
                                <SizeSelect sizes={sizeList} choosed={sizeFilters} handler={(size_data)=>setSizeFilters(size_data)} type='multi'/>
                            </Accordion>
                        }
                        
                        <Accordion 
                            header={
                                <div className={styles.accordion}>
                                    Material
                                    <ClearButton triger={materialFilters.length} handler={()=>setMaterialFilters([])}/>
                                </div>
                            }
                            >
                            <CheckBoxList data={materials} handler={(value)=>setMaterialFilters(value)} checkedItems={materialFilters} />
                        </Accordion>
                        <Accordion  
                            autoHeight={true}
                            header={
                                <div className={styles.accordion}>
                                    Price
                                    <ClearButton triger={priceFilters.length} handler={()=>setPriceFilters([])}/>
                                </div>
                            }
                            >
                            <CheckBoxList data={price_params} handler={(value)=>setPriceFilters(value)} checkedItems={priceFilters} />
                        </Accordion>
                        <Accordion
                            autoHeight={true}
                            header={
                                <div className={styles.accordion}>
                                    Percent Off
                                    <ClearButton triger={percentFilters.length} handler={()=>setPercentFilters([])}/>
                                </div>
                            }
                        >
                            <CheckBoxList data={percent_params} handler={(value)=>setPercentFilters(value)} checkedItems={percentFilters} />
                        </Accordion>
                        <div className={styles["button-bar"]}>
                            <Button mode='secondary' height="45px" width="50%" onClick={()=>clearEvent()}>Clear</Button>
                            <Button mode='primary' height="45px" width="50%" onClick={()=>setIsFiltersOptionsOpen(false)}>View results ({productsLength})</Button>
                        </div>
                    </motion.div>
                
                </>
            }
           
        </AnimatePresence>
        
         
    </div>;
};
 
export default Filters;