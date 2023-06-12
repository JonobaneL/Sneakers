import React, { useState } from 'react'
import styles from './LogIn.module.scss'
import { useInput } from '../../hooks/useInput';
import { useAuth } from '../../context/AuthContext';
import CInput from '../../components/UI/input/CInput';
import ValidationErrorMessages from '../../components/ValidationErrorMessages/ValidationErrorMessages';
import { Link,useNavigate } from 'react-router-dom';
import Toast from '../../components/ToastV2/Toast';

const LogIn = () => {
    const { login, } = useAuth();
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:"Email can't be blank",isEmail:"Provide a valid email address"})
    const password = useInput('',{isEmpty:true,minLength:6},{isEmpty:"Password can't be blank",minLength:"Password must has a least 6 characters"})
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setIsLoading(true)
            await login(email.value,password.value)
            navigate('/user-profile/info')
        }catch{
            setError(true)
        } 
        setIsLoading(false)

    }
    const isFormValid = (params,loading) =>{
        return params.includes(false)||loading==true?true:false
    }
    return (
    <div className={styles['log-in']}>
        <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Log In</h2>
                <ValidationErrorMessages durty={email.isDurty} errorMessages={email.currentErrors}>
                    <CInput 
                        value={email.value} 
                        onChange={ e=> email.onChange(e)} 
                        onBlur={e => email.onBlur(e)} 
                        id="email" 
                        mode='fullBorder' 
                        height='50' 
                        placeholder="Email" 
                        type='email'
                        valid={email.isDurty && email.currentErrors.length>0}
                        />
                </ValidationErrorMessages>
                <ValidationErrorMessages durty={password.isDurty} errorMessages={password.currentErrors}>
                    <CInput 
                        value={password.value} 
                        onChange={e => password.onChange(e)} 
                        onBlur={e => password.onBlur(e)}
                        id="password" 
                        mode='fullBorder' 
                        height='50' 
                        placeholder="Password" 
                        type='password'
                        valid={password.isDurty && password.currentErrors.length>0}
                    />
                </ValidationErrorMessages>
                <button 
                    className={styles['submit-btn']} 
                    type='submit' 
                    disabled={isFormValid([email.isValid,password.isValid],isLoading)}
                >
                    Log In
                </button>
            </form>
            <div className={styles.message}>
               <Link to='/password-reset'>Forgot Password?</Link>
            </div>
            <div className={styles.message}>
                <p>Need an account? <Link to='/sign-up'>Sign Up</Link></p>
            </div>
        </div>
        <Toast type="error" title='Wrong email or password' triger={error} closeHandler={setError}/>
    </div>
    ) 
}
export default LogIn;