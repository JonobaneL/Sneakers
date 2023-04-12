import React, {useState,useEffect} from 'react';
import Filters from '../../components/Filters/Filters';
import ShoesList from '../../components/shoesList/ShoesList';
import Pagination from '../../components/UI/pagination/Pagination';
import { useParams } from 'react-router-dom';
import { getTotalPagesCount } from '../../utils/getPageCount';
import { useFiltered, useToShow } from '../../hooks/useFilters';
import { shoes } from '../../data/shoes';
import styles from './Shoes.module.scss'

const Shoes = () => {
    const {type} = useParams();
    // const [shoesCategories,shoesBrands,shoesMaterial] = getShoesData(type); 
    // const [limit,setLimit] = useState(12)
    const limit = 12;
    const [currentPage,setCurrentPage] = useState(1);
    const [filters,setFilters] = useState({
      brands:[],
      colors:[],
      size:[],
      materials:[],
      price:[],
      percent:[]
    });
    const filteredItems = useFiltered(shoes,type,filters.brands,filters.colors,filters.price,filters.percent,filters.size,filters.materials)
    const shownData = useToShow(filteredItems,limit,currentPage)
    const clearEvent =()=>{
      setFilters(
        {
          brands:[],
          colors:[],
          size:[],
          materials:[],
          price:[],
          percent:[]
        })
    }
    const clearTriger = ()=>{
      let result = false
      for(var obj_item in filters){
        if(filters[obj_item].length>0) result = true
      }
      return  result
    }
    // useEffect(()=>{
    //   clearEvent()
    //   window.scrollTo(0,0)
    // },[type])
    const totalCountPages = getTotalPagesCount(filteredItems.length,12)
    return (
        <div className={styles.shoes}>
            <div className={styles.content}>
              <div className={styles.title}>
                  <h2>{type}
                    {type=='men' ||type=='women'?`'s shoes`:null}
                  </h2>
              </div>
              <div className={styles.shoesNumber}>
                  <p>{(currentPage*limit)-limit+1}-{currentPage*limit>filteredItems.length?filteredItems.length:currentPage*limit} of {filteredItems.length} products</p>
                  {/* <p onClick={()=>clearEvent()} className={`${styles.clearBtn} ${clearTriger()?styles.active:''}`}>Clear All Refinements</p> */}
              </div>
              <div className={styles.filters}>
                <Filters filters={filters} setFilters={setFilters} numberOfProducts={filteredItems.length} />
              </div>
              <div className={styles.list}>
                <div className={styles.shoes}>
                  <ShoesList data={shownData}/>
                </div>
                {
                  filteredItems.length>limit
                  ? <div className={styles["list-navigation"]}>
                      <Pagination total={totalCountPages} current={currentPage} changePage={setCurrentPage}/>
                    </div>
                  :null
                }
              </div>
            </div>
        </div>
    );
};


export default Shoes;