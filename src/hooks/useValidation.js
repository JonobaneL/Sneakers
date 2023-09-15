import { useEffect, useState } from "react";

const addErrorMessage = (initialValue,callback,currentValue) =>{
    if(!initialValue.includes(currentValue)) callback(p=>[...p,currentValue]);
  }

export const useValidation = (value='',validations,validationErrorMessages) =>{
    const [isEmpty,setIsEmpty] = useState(true);
    const [minLength,setMinLength] = useState(false);
    const [maxLength,setMaxLength] = useState(false);
    const [isEmail,setEmailError] = useState(false);
    const [currentErrors, setCurrentErrors] = useState([])
    const [isValid,setIsValid] = useState(false)
    const standart = {
        isEmpty:'Field is empty',
        minLength:'Not enough letters',
        maxLength:'Too many letters',
        isEmail:'Enter email',
        isMatch: `They don't match`
    }
    useEffect(()=>{
      for(const item in validations){
        switch (item){
          case 'minLength':
            if(value.length < validations[item]){
              setMinLength(true);
              addErrorMessage(currentErrors,setCurrentErrors,validationErrorMessages?.minLength||standart.minLength)
            }else{
              setMinLength(false);
              setCurrentErrors(p=>p.filter(item=>item !== (validationErrorMessages?.minLength||standart.minLength)))
            }
          break;
          case 'maxLength':
            if(value.length>validations[item]){
              setMaxLength(true)
              addErrorMessage(currentErrors,setCurrentErrors,validationErrorMessages?.maxLength||standart.maxLength)
            }else{
              setMaxLength(false);
              setCurrentErrors(p=>p.filter(item=>item !== (validationErrorMessages?.maxLength||standart.maxLength)))
            }
            break;
          case 'isEmail':
            const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            re.test(String(value).toLowerCase())?setEmailError(false):setEmailError(true)
            if(re.test(String(value).toLowerCase())){
                setEmailError(false)
                setCurrentErrors(p=>p.filter(item=>item !== (validationErrorMessages?.isEmail||standart.isEmail)))
            }else{
                setEmailError(true)
                addErrorMessage(currentErrors,setCurrentErrors,validationErrorMessages?.isEmail||standart.isEmail)
            }
            break;
          case 'isMatch':
            if(value === validations[item]){
              setCurrentErrors(p=>p.filter(item=>item !== (validationErrorMessages?.isMatch || standart.isMatch)))
            }else{
              addErrorMessage(currentErrors,setCurrentErrors,validationErrorMessages?.isMatch || standart.isMatch)
            }
            break
          case 'isEmpty':
            if(value){
              setIsEmpty(false);
              setCurrentErrors(p=>p.filter(item=>item !== (validationErrorMessages?.isEmpty||standart.isEmpty)))
            }else{
              setIsEmpty(true)
              setCurrentErrors([validationErrorMessages?.isEmpty||standart.isEmpty])
            }
          break;
        }
      }
    },[value])
    useEffect(()=>{
      if(currentErrors.length <= 0){
        setIsValid(true)
      }else{setIsValid(false)}
    },[value,currentErrors])
    return {
      isEmpty,
      minLength,
      maxLength,
      isEmail,
      isValid,
      currentErrors,
    }
  }