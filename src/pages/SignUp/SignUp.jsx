import React, { useState } from 'react'
import styles from './SignUp.module.scss'
import CInput from '../../components/UI/input/CInput'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useInput } from '../../hooks/useInput'
import ValidationErrorMessages from '../../components/ValidationErrorMessages/ValidationErrorMessages'
import Toast from '../../components/ToastV2/Toast'
import { addNewUser } from '../../fireAuthAPI'
import Autocomplete from '../../components/UI/autocomplete/Autocomplete'
import { findLocation } from '../../utils/searchLocation'
import Button from '../../components/UI/button/Button'


const SignUp = () => {
    const { signUp } = useAuth();
    const email = useInput('',{isEmpty:true,isEmail:true},{isEmpty:"Email can't be blank",isEmail:"Provide a valid email address"})
    const password = useInput('',{isEmpty:true,minLength:6},{isEmpty:"Password can't be blank",minLength:"Password must has at least 6 characters"})
    const firstName = useInput('',{isEmpty:true},{isEmpty:"This field can't be blank"})
    const lastName = useInput('',{isEmpty:true},{isEmpty:"This field can't be blank"})
    const city = useInput('',{isEmpty:true},{isEmpty:"This field can't be blank"})
    const passwordConfirm = useInput('',{isEmpty:true,minLength:6,isMatch:password.value},{isEmpty:"Confirm password can't be blank",minLength:"Password must has at least 6 characters",isMatch:`Passwords don't match`})
    const [isLoading,setIsLoading]= useState(false);
    const locationResponse = findLocation(city.value)
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            setIsLoading(true)
            const userResponce = await signUp(email.value,password.value)
            await addNewUser({
                id: userResponce.user.uid,
                firstName: firstName.value,
                lastName: lastName.value,
                city: city.value,
                phone:null,
                payment_methods:[],
                delivery_addresses:[],
            })
            navigate('/user-profile/info')
        }catch(err){
            console.log(err)
            setError(true)
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
                <div className={styles["name-section"]}>
                    <ValidationErrorMessages durty={firstName.isDurty} errorMessages={firstName.currentErrors}>
                        <CInput 
                            value={firstName.value} 
                            onChange={ e=> firstName.onChange(e)} 
                            onBlur={ e => firstName.onBlur(e)} 
                            id="firstName" 
                            mode='fullBorder' 
                            height='50' 
                            placeholder="First Name" 
                            type='text'
                            valid={firstName.isDurty && firstName.currentErrors.length>0}
                            />
                    </ValidationErrorMessages>
                    <ValidationErrorMessages durty={lastName.isDurty} errorMessages={lastName.currentErrors}>
                        <CInput 
                            value={lastName.value} 
                            onChange={ e=> lastName.onChange(e)} 
                            onBlur={ e => lastName.onBlur(e)} 
                            id="lastName" 
                            mode='fullBorder' 
                            height='50' 
                            placeholder="Last Name" 
                            type='text'
                            valid={lastName.isDurty && lastName.currentErrors.length>0}
                            />
                    </ValidationErrorMessages>
                </div>
                <ValidationErrorMessages durty={email.isDurty} errorMessages={email.currentErrors}>
                    <CInput 
                        value={email.value} 
                        onChange={e => email.onChange(e)} 
                        onBlur={e => email.onBlur(e)} 
                        id="email" 
                        mode='fullBorder' 
                        height='50' 
                        placeholder="Email" 
                        type='email'
                        valid={email.isDurty && email.currentErrors.length>0}
                        />
                </ValidationErrorMessages>
                <ValidationErrorMessages durty={city.isDurty} errorMessages={city.currentErrors}>
                    <Autocomplete data={locationResponse} query={city.value} setQuery={city.setValue} >
                        <CInput  
                            value={city.value} 
                            onChange={e=>city.onChange(e)} 
                            id="location" 
                            mode='fullBorder'
                            onBlur={e => city.onBlur(e)}
                            height={50}
                            placeholder="Enter your city"
                            valid={city.isDurty && city.currentErrors.length>0}

                            />
                    </Autocomplete>
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
                <Button
                    width='100%'
                    height='45px'
                    mode='primary'
                    type='submit'
                    disabled={isFormValid([email.isValid,password.isValid,passwordConfirm.isValid],isLoading)}
                >
                    Sign Up
                </Button>
            </form>
            <div className={styles.message}>
                <p>Already have an account? <Link to='/log-in'>Log In</Link></p>
            </div>
        </div>
        <Toast type="error" title='Failed to create an account' triger={error} closeHandler={setError}/>
    </div>
  ) 
}
export default SignUp;