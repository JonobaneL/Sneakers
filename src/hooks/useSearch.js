import { useEffect, useMemo, useState } from "react"

export const useSearch =(data,query,searchField) =>{
    const [apiQuery, setApiQuery]=useState('')
    useEffect(()=>{
        const time = setTimeout(()=>setApiQuery(query),500);
        return ()=>clearTimeout(time)
    },[query])
    const searchedData = useMemo(()=>{
        return data.filter(item=> item[searchField].toLowerCase().includes(apiQuery.toLowerCase()))
    },[data,apiQuery])
    return searchedData;
}