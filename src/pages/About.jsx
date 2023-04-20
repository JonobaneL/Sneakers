import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import { getShoesFiltersData } from '../utils/getShoesData';
import SInput from '../components/UI/input/SInput';
import { useSearch } from '../hooks/useSearch';

const About = () => {
  const male = "men";
  const inputRef = useRef();
  const [query, setQuery] = useState("")


  const [,shoesBrands] = getShoesFiltersData(male)
  
  const brands = useSearch(shoesBrands,query)
  // findBrand(shoesBrands,inputRef.current.value ?? " ")
    return <div className="About">
        <div className="content" >
          <div className="search">
            {/* <SInput height="30px" params={{type:"text",placeholder:"Find Your brand"}}/> */}
            <input type="text" value={query} onChange={(e)=>{
                setQuery(e.target.value)
            }} />
           
          </div>
          <br />
          {
            brands.map(item=>
              <p key={item.id}>{item.name}</p>
              )
          }
        </div>
    </div>;
}
 
export default About;