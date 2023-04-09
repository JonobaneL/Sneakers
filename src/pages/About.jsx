import React,{useState,useEffect,useMemo, useCallback} from 'react'
import { useSearchParams,useNavigate, useNavigation, BrowserRouter, useLocation, createSearchParams } from 'react-router-dom';


const About = () => {

  function getSearchParam(search,param){
    const searchParams = createSearchParams(search);
    // console.log(searchParams.toString())
    return searchParams.get(param)
  }
  function setSearchParam(search,param,value){
    const searchParams = createSearchParams(search);
    Boolean(value)
    ? searchParams.set(param, value)
    : searchParams.delete(param);
      console.log(searchParams.toString())
    return searchParams.toString()
  }
const useSearchParamsState = ({name,serialize=String,deserialize=(v)=>v}) =>{
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(()=>{
    const tmpValue = deserialize(getSearchParam(location.search,name));
    return tmpValue;
  })
  const updateValue = useCallback((value)=>{
    setValue(value);
    const newSearch = setSearchParam(location.search,name,serialize(value));
    navigate({search:newSearch})

  },[location,name,serialize])
  return [value,updateValue];
}

  const [check,setCheked] = useSearchParamsState({name:"indicator",deserialize:(v)=>v?v:""})
  const [filed,setField] = useSearchParamsState({name:"field",deserialize:(v)=>v?v:[]})
  
console.log(filed)
    return <div className="About">
        <div className="content" >
          
          <br />
          <label>
            Enter your name: 
            <input 
              type="text" 
              name="check" 
              value={check} 
              onChange={(e)=>{
                setCheked(e.target.value)
                }}
              /> 
           </label>
           <br />
              
           <button
           onClick={()=>{
            setField(["red","blue","green"])
           }}
           >Click</button>
           <h2>{filed}</h2>
           {/* <button style={{width:'120px',height:'40px',fontSize:'15px'}}
            onClick={()=>setSearchParam(search,'num',10)}
           >SetHandle</button>
           <button style={{width:'120px',height:'40px',fontSize:'15px'}}
            onClick={()=>getSearchParam(search,'num')}
           >GetHandle</button> */}
           <br />
           <br />
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime dolorum asperiores illum, nisi temporibus expedita veritatis optio obcaecati autem, deserunt porro repudiandae ratione hic ut molestias, omnis fugit quia voluptatibus.
            Voluptates dignissimos deleniti ipsa aperiam et itaque similique quaerat. Incidunt nulla aliquid rerum enim ea consequuntur repudiandae! Non corporis provident iusto animi ullam. Autem repellendus molestias quod sint animi? Quis!
            Nobis eligendi necessitatibus voluptatum suscipit praesentium excepturi error beatae laborum vero eveniet aliquam alias, quis molestiae in quibusdam delectus minima itaque consectetur laudantium tenetur neque ducimus minus quidem harum. Et.
            Quia exercitationem quo nesciunt eius explicabo, sint hic laboriosam, nostrum iure, iste ea incidunt quaerat. Necessitatibus eaque expedita architecto ipsam natus in, odit dolores ullam laboriosam aut, illum culpa porro?
            Ipsam eaque expedita a quasi? Quam assumenda illum commodi, pariatur maxime nobis iste magnam officia doloremque ex est labore tempora itaque enim ratione ipsa unde. Voluptatem nesciunt praesentium adipisci a.
            Facere, inventore eum alias quae fugit magnam amet natus nulla officiis cupiditate adipisci! Suscipit, illum. Optio eos animi fuga fugiat, ipsa veniam odio hic perspiciatis ut a nemo rem incidunt.
            Et dolore qui, quis cupiditate voluptates dicta unde quidem facilis cum eos quos doloremque ea nobis voluptatem ut at aliquid modi quod culpa sunt incidunt sint veritatis? Cumque, totam officia.
            Earum ex non harum magnam facilis excepturi quae
        
        </div>
    </div>;
}
 
export default About;