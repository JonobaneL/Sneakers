import { useCallback, useEffect, useState } from "react"

export const useAsync = (callback,dependencies = [])=>{
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [value,setValue] = useState()

    const callbackMemorized = useCallback(()=>{
        setIsLoading(true);
        setError(undefined)
        setValue(undefined)
        callback()
            .then(setValue)
            .catch(setError)
            .finally(()=>setIsLoading(false))
    },dependencies)
    useEffect(()=>{
        callbackMemorized()
    },[callbackMemorized])
    return {isLoading,error,value}
}