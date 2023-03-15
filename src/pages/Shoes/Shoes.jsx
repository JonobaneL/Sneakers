import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import styles from './Shoes.module.scss'
import ShoesList from '../../components/shoesList/ShoesList';
import { getShoes } from '../../utils/getShoesPageData';
import { getTotalPagesCount } from '../../utils/pages';
import { usePagination } from '../../hooks/usePagination';
import Pagination from '../../components/UI/pagination/Pagination';
const Shoes = () => {
    const {type} = useParams();
    
    const [shoes,setShoes]=useState([])
    const [shoesLength,setShoesLength]=useState(0)
    const [shoesCategories,setShoesCategories]=useState([])
    const [shoesBrands,setShoesBrands]=useState([])
    const [shoesMaterial,setShoesMaterial]=useState([])
    const [totalCountPages, setTotalCountPages] = useState(0)
   
    const [limit,setLimit] = useState(12)
    const [currentPage,setCurrentPage] = useState(1)
    useEffect(() => {
      const response =  getShoes(type,limit,currentPage);
      setShoes(response.shoesResponse);
      setShoesLength(response.shoesLength);
      setShoesCategories(response.shoesCategoriesResponse);
      setShoesBrands(response.shoesBrandsResponse);
      setShoesMaterial(response.shoesMaterialResponse);
      setTotalCountPages(Math.ceil(shoesLength/limit))
    }, [currentPage,limit]);

    console.log('total pages', totalCountPages)
    //пофіксити фігню з пагінацією
    const pagesArray = usePagination(totalCountPages)
    return (
        <div className={styles.shoes}>
            <div className={styles.content}>
              <div className={styles.title}>
                  <h2>{type}
                    {type=='men' ||type=='women'?`'s shoes`:null}
                  </h2>
              </div>
              <div className={styles.filters}>
                <Filters data={{shoes,shoesCategories,shoesBrands,shoesMaterial}}/>
              </div>
              <div className={styles.list}>
                <ShoesList data={shoes}/>
                <div className={styles["list-navigation"]}>
                  <Pagination pages={pagesArray} current={currentPage} changePage={setCurrentPage}/>
                </div>
              </div>
            </div>
        </div>
    );
};


export default Shoes;