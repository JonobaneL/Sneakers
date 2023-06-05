import React, { useState } from 'react'
import styles from './SignUp.module.scss'
import CInput from '../../components/UI/input/CInput'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useInput } from '../../hooks/useInput'
import ValidationErrorMessages from '../../components/ValidationErrorMessages/ValidationErrorMessages'

export const SignUp = () => {
    const { signUp } = useAuth();
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:"Email can't be blank",isEmail:"Provide a valid email address"})
    const password = useInput('',{isEmpty:true,minLength:6},{isEmpty:"Password can't be blank",minLength:"Password must has a least 6 characters"})
    const passwordConfirm = useInput('',{isEmpty:true,minLength:6,isMatch:password.value},{isEmpty:"Confirm password can't be blank",minLength:"Password must has a least 6 characters",isMatch:`Passwords don't match`})
    const [isLoading,setIsLoading]= useState(false);
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setIsLoading(true)
            await signUp(email.value,password.value)
        }catch{

        }
        setIsLoading(false)

    }
    const isFormValid = (params,loading) =>{
        return params.includes(false)||loading==true?true:false
    }
  return (
    <div className={styles['sign-up']}>
        <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>Sign Up</h2>
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
                <ValidationErrorMessages durty={passwordConfirm.isDurty} errorMessages={passwordConfirm.currentErrors}>
                    <CInput 
                        id="confirmPassword" 
                        mode='fullBorder' 
                        height='50' 
                        value={passwordConfirm.value}
                        onChange={e => passwordConfirm.onChange(e)} 
                        onBlur={e => passwordConfirm.onBlur(e)}
                        placeholder="Confirm Password" 
                        type='password'
                        valid={passwordConfirm.isDurty && passwordConfirm.currentErrors.length>0}
                        />
                </ValidationErrorMessages>
                <button 
                    className={styles['submit-btn']} 
                    type='submit' 
                    disabled={isFormValid([email.isValid,password.isValid,passwordConfirm.isValid],isLoading)}
                    >Sign Up</button>
            </form>
            <div className={styles.message}>
                <p>Already have an account? <Link>Log In</Link></p>
            </div>
        </div>
    </div>
  ) 
}
