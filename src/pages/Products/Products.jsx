import React,{useState,useEffect} from "react"; 
import styles from './Products.module.scss'
import { useParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import ProductsList from "../../components/productsList/ProductList";
import { useToShow } from "../../hooks/useFilters";
import { getTotalPagesCount } from "../../utils/getPageCount";
import Pagination from "../../components/UI/pagination/Pagination";
const Products = () => {
    const {type,male} = useParams();
    const [data,setData] = useState([]);
    const limit = 12;
    const [currentPage, setCurrentPage] = useState(1);
    const shownData = useToShow(data,limit,currentPage);
    const totalCountPages = getTotalPagesCount(data.length,limit);
    const titleEvent = ()=>{
        return `${!male?'':male!=='kids'?`${male}'s`:`${male}'`} ${type}`
    }
    useEffect(()=>{
      setCurrentPage(1)
    },[type,male])
    return <div className={styles.products}>
            <div className={styles.content}>
                  <h2 className={styles.title}>{titleEvent()}</h2>
                <p className={styles.nuberOfProducts}> 
                  {(currentPage*limit)-limit+1}-{limit} of {data.length} products
                </p>
              <div className={styles.filters}>
                <Filters setData={setData}/>
              </div>
              <div className={styles.list}>
                <div className={styles.shoes}>
                  <ProductsList data={shownData}/>
                </div>
                {
                   data.length>limit
                   ? <div className={styles["list-nav"]}>
                       <Pagination total={totalCountPages} current={currentPage} changePage={setCurrentPage}/>
                     </div>
                   :null
                }
              </div>
            </div>
    </div>;
}
 
export default Products;