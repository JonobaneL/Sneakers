import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import { useInput } from '../hooks/useInput';


const About = () => {
  const email = useInput('',{isEmpty:true,minLength:4,isEmail:true}, {isEmpty:'Field cannot be empty',minLength:'Enter more then 3 letters'});
  const password = useInput('',{isEmpty:true,minLength:6},{});
  console.log(email.isEmail)
  console.log(email.currentErrors) 
    return <div className={styles.about}>
        <div className={styles.content} >
          <form>
            <input value={email.value} onChange={e =>email.onChange(e)} onBlur={e =>email.onBlur(e)} type="email" name="email" id="userEmail" placeholder="Enter your email" />
            <ul>
              {email.isDurty && email.currentErrors[email.currentErrors.length-1]}
            </ul>
            <input value={password.value} onChange={e =>password.onChange(e)} onBlur={e =>password.onBlur(e)} type="password" name='password' id='userPassword' placeholder='Enter your password' />
            <button type='submit'>Log In</button>
          </form>
        </div>
    </div>;
}
 
export default About;