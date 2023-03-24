import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import styles from './Shoes.module.scss'
import ShoesList from '../../components/shoesList/ShoesList';
import { getShoesData } from '../../utils/getShoesData';
import { getTotalPagesCount } from '../../utils/pages';
import Pagination from '../../components/UI/pagination/Pagination';
import { useShoes } from '../../hooks/useShoes';
const Shoes = () => {
    const {type} = useParams();
    const [shoesData,shoesCategories,shoesBrands,shoesMaterial] = getShoesData(type); 
    // const [limit,setLimit] = useState(12)
    // const [currentPage,setCurrentPage] = useState(1);
    const [filters,setFilters] = useState({
      brands:[],
      colors:[],
      size:[],
      materials:[],
      price:[],
      percent:[]
    });
    const filteredItems = useShoes(shoesData,type,filters.brands,filters.colors,filters.price,filters.percent)
    console.log(filters)
    console.log(filteredItems)
    useEffect(()=>{
      setFilters(
        {
          brands:[],
          colors:[],
          size:[],
          materials:[],
          price:[],
          percent:[]
        })
    },[type])
    const totalCountPages = getTotalPagesCount(filteredItems.length,12)
    return (
        <div className={styles.shoes}>
            <div className={styles.content}>
              <div className={styles.title}>
                  <h2 onClick={()=>setFilters({...filters,brands:['Adidas']})}>{type}
                    {type=='men' ||type=='women'?`'s shoes`:null}
                  </h2>
              </div>
              <div className={styles.filters}>
                <Filters filters={filters} setFilters={setFilters} data={{shoesCategories,shoesBrands,shoesMaterial}}/>
              </div>
              <div className={styles.list}>
                <div className={styles.shoes}>
                  <ShoesList data={filteredItems}/>
                </div>
                {/* <div className={styles["list-navigation"]}>
                  <Pagination total={totalCountPages} current={currentPage} changePage={setCurrentPage}/>
                </div> */}
              </div>
            </div>
        </div>
    );
};


export default Shoes;