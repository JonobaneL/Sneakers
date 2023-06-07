import React, { useState } from 'react';
import styles from './UserProfile.module.scss'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { firebaseDB } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";

const UserProfile = () => {
    const { currentUser,logout } = useAuth();
    const navigate = useNavigate()
    const [users,setUsers] = useState([])
    const getData = async()=>{
        try{
            const fireStoreResponse = await getDocs(collection(firebaseDB,'users'))
            const data = fireStoreResponse.docs.map(item=>item.data())
            setUsers(data)

        }catch(err){
            console.log(err)
        }
        
    }
    const handleLogout = async()=>{
        try{
            await logout();
            navigate('/log-in')
        }catch (err){
            console.log(err)
        }
    }
    return (
        <div className={styles.profile}>
            <div className={styles.content}>
                <h1>User Profile</h1>

                <div className={styles["user-info"]}>
                    <p>Email: { currentUser.email }</p>
                </div>
                <button className={styles['log-out-btn']} onClick={handleLogout}>Log Out</button>
                <br/>
                <br/>
                <button className={styles['log-out-btn']} onClick={getData}>Get data</button>
                <ul>
                    {users.map((item,index)=><>
                        <li >
                            <p>First Name: {item.name.first}</p>
                            <p>Last Name: {item.name.last}</p>
                            <p>City: {item.city}</p>
                            <li>-------------------</li>
                        </li>
                    </>)}
                </ul>

            </div>
        </div>
    );
};


export default UserProfile;