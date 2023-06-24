import React from 'react'
import styles from './LogIn.module.scss'
import { Link,useNavigate } from 'react-router-dom';
import LogInForm from '../../components/LogInForm/LogInForm';

const LogIn = () => {
    const navigate = useNavigate();
    
    return (
    <div className={styles['log-in']}>
        <div className={styles.content}>
            <h2 className={styles.title}>Log In</h2>
            <LogInForm callback={()=>navigate('/user-profile/info')} />
            <div className={styles.message}>
               <Link to='/password-reset'>Forgot Password?</Link>
            </div>
            <div className={styles.message}>
                <p>Need an account? <Link to='/sign-up'>Sign Up</Link></p>
            </div>
        </div>
    </div>
    ) 
}
export default LogIn;