import { useMemo } from "react";

export const usePagination = (total=1)=>{
    console.log("pagination had worked")
    const pagesArray = useMemo(()=>{
        return Array(total).fill().map((_,i)=>i+1)
    },[total])
    console.log(pagesArray)
    return pagesArray;
}