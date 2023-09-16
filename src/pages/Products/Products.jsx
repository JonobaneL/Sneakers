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
    const [isProductsLoading,setProductsLoading] = useState(true)
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
    // console.log(isProductsLoading)
    // console.log(productsError)
    //дуже багато пить до цього варіанту виконання відображення, сортування та фільтрації товарів
    return <div className={styles.products}>
            <div className={styles.content}>
                  <h2 className={styles.title}>{titleEvent()}</h2>
                <p className={styles.nuberOfProducts}> 
                  {(currentPage*limit)-limit+1}-{limit} of {data.length} products
                </p>
              <div className={styles.filters}>
                <Filters setData={setData} loading={setProductsLoading}  />
              </div>
              <div className={styles.list}>
                    {/* {
                      (data.length==0)//перевірити ще раз цей код
                      ?<div className={styles.warning}>
                        <h1>No Results</h1>
                        <h3>Try different filters</h3>
                      </div>
                      :<ProductsList data={shownData} isLoading={isProductsLoading} />
                    } */}
                      <ProductsList data={shownData} isLoading={isProductsLoading} />

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