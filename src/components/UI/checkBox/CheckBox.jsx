import React,{useState,useEffect} from 'react';
import styles from './CheckBox.module.scss'
const CheckBox = ({data}) => {
    const [choosed,setChoosed]= useState([]);
    const handleChange=(e)=>{
        if(e.target.checked){
            setChoosed([...choosed,e.target.value])
        }
        else{
            setChoosed(choosed.filter(item=>item !==e.target.value))
        }
    }
    useEffect(() => {
        console.log(choosed)
      
    }, [choosed]);
    return (
        <div className={styles.checkBox}>
            {data.map(item=>
            <div className={styles.checkBox__item} key={item.id}>
                <input className={styles.checkBox__indivator} value={item.name} onClick={handleChange} type="checkbox" name="brand" id={`box-${item.id}`} />
                <label className={styles.checkBox__label} htmlFor={`box-${item.id}`}>{item.name}</label>
            </div>)}
        </div>
    );
};


export default CheckBox;