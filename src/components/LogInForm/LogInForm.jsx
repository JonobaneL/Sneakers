import React, { useState } from 'react';
import Button from '../UI/button/Button';
import ValidationErrorMessages from '../ValidationErrorMessages/ValidationErrorMessages';
import CInput from '../UI/input/CInput';
import { useAuth } from '../../context/AuthContext';
import Toast from '../ToastV2/Toast';
import { useInput } from '../../hooks/useInput';
import styles from './LogInForm.module.scss'
import { logIn1 } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';

const LogInForm = ({callback}) => {
    const { login,currentUser } = useAuth();
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:"Email can't be blank",isEmail:"Provide a valid email address"})
    const password = useInput('',{isEmpty:true,minLength:6},{isEmpty:"Password can't be blank",minLength:"Password must has a least 6 characters"})
    const [isLoading,setIsLoading]= useState(false);
    const [error,setError] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setIsLoading(true)
            await login(email.value,password.value)
            callback();
            dispatch(logIn1(currentUser))
        }catch{
            setError(true)
        } 
        setIsLoading(false)

    }
    const isFormValid = (params,loading) =>{
        return params.includes(false)||loading==true?true:false
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                <Button 
                    mode='primary' 
                    width='100%' 
                    height='45px'
                    type='submit'
                    disabled={isFormValid([email.isValid,password.isValid],isLoading)}
                >
                    Log In
                </Button>
            </form>
            <Toast type="error" title='Wrong email or password' triger={error} closeHandler={setError}/>
        </>
        
    );
};


export default LogInForm;