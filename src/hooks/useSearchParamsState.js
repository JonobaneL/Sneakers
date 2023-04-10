import {useState,useCallback} from 'react'
import {useLocation, useNavigate, createSearchParams} from 'react-router-dom'
import { useLatest } from './useLatest';

function getSearchParam(search,param){
    const searchParams = createSearchParams(search);
    return searchParams.get(param)
}
function setSearchParam(search,param,value){
    const searchParams = createSearchParams(search);
    Boolean(value)
    ? searchParams.set(param, value)
    : searchParams.delete(param);
    return searchParams.toString()
}

export const useSearchParamsState = ({name,serialize=String,deserialize=(v)=>v}) =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(()=>{
      const tmpValue = deserialize(getSearchParam(location.search,name));
      return tmpValue;
    })
    const latestValue = useLatest(value);
    const updateValue = useCallback(
      (newValue)=>{
      const actualValue = 
        typeof newValue === 'function'
          ? newValue(latestValue.current)
          :newValue;  
        
      setValue(actualValue);
  console.log(typeof serialize(actualValue))
      const newSearch = setSearchParam(location.search,name,serialize(actualValue));
      console.log(newSearch)
      navigate({search:newSearch})
  
    },[location,name,serialize,latestValue])
    return [value,updateValue];
  }