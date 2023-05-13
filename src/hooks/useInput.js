import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (initialValue,validations,validationErrorMessages)=>{
    const [value,setValue]= useState(initialValue);
    const [isDurty,setIsDurty]=useState(false);
    const valid = useValidation(value,validations,validationErrorMessages);
    const onChange = e =>{
      setValue(e.target.value)
    }
    const onBlur = e =>{
      setIsDurty(true)
    }
    return {
      value,
      onChange,
      onBlur,
      isDurty,
      ...valid
    }
    
}