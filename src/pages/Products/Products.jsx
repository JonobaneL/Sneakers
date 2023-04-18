import React,{useState,useEffect} from "react"; 
import styles from './Products.module.scss'
import { useParams } from "react-router-dom";
import Filters1 from "../../components/Filters1/Filters1";
import ShoesList from "../../components/shoesList/ShoesList";
const Products = () => {
    const {type,male} = useParams();
    const [filters,setFilters] = useState({})
    const [data,setData] = useState([]);

    return <div className={styles.products}>
            <div className={styles.content}>
              <div className={styles.title}>
                  <h2>{male}
                    {male=='men' ||male=='women'?`'s shoes`:null}
                  </h2>
              </div>
             
              <div className={styles.filters}>
                <Filters1 setData={setData}/>
              </div>
              <div className={styles.list}>
                <div className={styles.shoes}>
                  <ShoesList data={data}/>
                </div>
              
              </div>
            </div>
    </div>;
}
 
export default Products;