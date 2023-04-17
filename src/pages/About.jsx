import React,{useState,useEffect,useMemo, useCallback} from 'react'
import { useSearchParamsState } from '../hooks/useSearchParamsState';
import { shoes } from '../data/shoes';
import ShoesList from '../components/shoesList/ShoesList';
import { useFiltered } from '../hooks/useFilters';
import { useSearchParams } from 'react-router-dom';

const About = () => {
  const btnBar = {
    width:'100%',
    height:'40px',
    display:"flex",
    justifyContent:"center",
    gap:"20px"
  }
  const btn_styles = {
    padding:"0 10px",
    fontSize:"16px",
    color:"#fff",
    background:"#1d2d44"
  }

  const [searchParam, setParams] = useSearchParams();
  for(const entry of searchParam.entries()){
    console.log(entry)
  }
  console.log("window.search = ",window.location.search||"none")
  const [male, setMale] = useState('men')
  const [brand,setBrand] = useSearchParamsState({name:"brand",serialize:(data)=>data.join("-"), deserialize:(data)=>data?data.split("-"):[]})
  const filteredData = useFiltered(shoes,male,brand)
  // const
  
  

    return <div className="About">
        <div className="content" >
          <div style={btnBar}>
            <button style={btn_styles} onClick={()=>setBrand(["Nike"])}>Nike</button>
            <button style={btn_styles} onClick={()=>setBrand(["Florshei"])}>Florshei</button>
            <button style={btn_styles} onClick={()=>setBrand(["Florshei","Nike"])}>Florshei + Nike</button>
            <button style={btn_styles} onClick={()=>setBrand([])}>Clear</button>
          </div>
          <br />
          <div style={btnBar}>
            <button style={btn_styles} onClick={()=>{
              // for(const entry of searchParam.entries()){
              //   searchParam.delete(entry[0])
              // }
              console.log("funk work")
              console.log(searchParam.delete("brand"))
              setMale("men")
            }}>Men</button>
            <button style={btn_styles} onClick={()=>setMale("women")}>Women</button>
          </div>
         <ShoesList data={filteredData}/> 
         
        </div>
    </div>;
}
 
export default About;