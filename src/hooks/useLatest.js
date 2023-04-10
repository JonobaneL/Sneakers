import { useLayoutEffect } from "react";
import { useRef } from "react"

export const useLatest = (value)=>{
    const valueRef = useRef(value);

    useLayoutEffect(()=>{
        valueRef.current = value;
    },[value])

    return valueRef;
}