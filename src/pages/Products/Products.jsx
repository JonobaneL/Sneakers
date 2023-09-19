import React,{useState,useEffect} from "react"; 
import styles from './Products.module.scss'
import { useParams } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import ProductsList from "../../components/productsList/ProductList";
import { useToShow } from "../../hooks/useFilters";
import { getTotalPagesCount } from "../../utils/getPageCount";
import Pagination from "../../components/UI/pagination/Pagination";
import { useProducts } from "../../hooks/useProducts";
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
    const [productsFilter,setProductsFilter]= useState({})
    const [modelsFilter,setModelsFilter]= useState({})
    useEffect(()=>{
      setCurrentPage(1)
    },[type,male])

    // const filterConfig = (name,filter,type='product')=>{
    //   console.log(name,filter)
    //   if(filter?.length===0){
    //     const tempCopy = {...productsFilter};
    //     delete tempCopy[name]
    //     if(type==='product'){
    //       setProductsFilter(tempCopy)
    //     }else if(type==='model'){
    //       setModelsFilter(tempCopy)
    //     }
    //   }else{
    //       if(type==='product'){
    //         setProductsFilter(p=>{return {...p,[name]:filter}})
    //       }else if(type==='model'){
    //         setModelsFilter(p=>{return {...p,[name]:filter}})
    //       }
    //   }
      
    // }
    const [test,testLoading,testError] = useProducts(type,male,productsFilter,modelsFilter)

    return <div className={styles.products}>
            <div className={styles.content}>
                  <h2 className={styles.title}>{titleEvent()}</h2>
                <p className={styles.nuberOfProducts}> 
                  {(currentPage*limit)-limit+1}-{limit} of {test.length} products
                </p>
              <div className={styles.filters}>
                <Filters 
                  setData={setData} 
                  productsLength={test.length} 
                  loading={setProductsLoading} 
                  onChangeProductFilter={setProductsFilter} 
                  onChangeModelFilter={setModelsFilter}
                  onChangeFilter = {(product,model)=>{
                    setProductsFilter(product)
                    setModelsFilter(model)
                  }}
                  />
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
                      {
                        (test.length==0 &&testLoading===false)?<h2>No Result</h2>
                        :<ProductsList data={test} isLoading={testLoading} />
                      }
                      {/* <ProductsList data={test} isLoading={testLoading} /> */}

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