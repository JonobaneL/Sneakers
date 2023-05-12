import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'

const useInputChange = (initialValue,validations) =>{
  const [value,setValue]= useState(initialValue);
  const [isDurty,setIsDurty]=useState(false);
  const valid = useValidation(value,validations);
  const [tmp,setTmp] = useState('')
  const onChange = e =>{
    setValue(e.target.value)
  }
  const onBlur = e =>{
    setIsDurty(true)
  }
    // if(isDurty && valid.isEmpty){
    //   console.log('field is empty')
    //   setTmp('Field is empty')
    // } else {setTmp('')}
    // console.log(tmp)
  const tmp1 = useMemo(()=>{},[isDurty,value])
  return {
    value,
    onChange,
    onBlur,
    isDurty,
    tmp,
    ...valid
  }
}

const useValidation = (value,validations,validationErrorMessages) =>{
  const [isEmpty,setIsEmpty] = useState(true);
  const [minLength,setMinLength] = useState(false);
  const [maxLength,setMaxLength] = useState(false);
  
  useEffect(()=>{
    for(const item in validations){
      switch (item){
        case 'minLength':
          value.length < validations[item] ? setMinLength(true) : setMinLength(false);
        break;
        case 'maxLength':
          value.length>validations[item]?setMaxLength(true) : setMaxLength(false)
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          // ще раз тут написати умову а тоді з цією зміною юзати десь isDurty
        break;
      }
    }
  },[value])
  return {
    isEmpty,
    minLength,
    maxLength,
  }
}
//пофіксити блятске генерування списку з помилками валідації

const About = () => {
  const email = useInputChange('',{isEmpty:true,minLength:5,maxLenght:8});
  const password = useInputChange('',{isEmpty:true,minLength:6});
    return <div className={styles.about}>
        <div className={styles.content} >
          <form>
            <input value={email.value} onChange={e =>email.onChange(e)} onBlur={e =>email.onBlur(e)} type="email" name="email" id="userEmail" placeholder="Enter your email" />
            { (email.isDurty && email.isEmpty) ? <div style={{color:'red',fontSize:'15px'}}>Field cannot be empty</div>:null}
            <input value={password.value} onChange={e =>password.onChange(e)} onBlur={e =>password.onBlur(e)} type="password" name='password' id='userPassword' placeholder='Enter your password' />
            <button type='submit'>Log In</button>
          </form>
        </div>
    </div>;
}
 
export default About;