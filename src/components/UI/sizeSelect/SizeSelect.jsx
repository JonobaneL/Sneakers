import React from "react";
import { getAvailableSizes } from "../../../utils/getAvailablesizes";
import styles from './SizeSelect.module.scss';

const SizeSelect = ({notAvailable=[],choosed,handler,type}) => {
    const size = [
        {value:'6', available:true}, 
        {value:'6.5', available:true}, 
        {value:'7', available:true}, 
        {value:'7.5', available:true}, 
        {value:'8', available:true}, 
        {value:'8.5', available:true}, 
        {value:'9', available:true}, 
        {value:'9.5', available:true}, 
        {value:'10', available:true}, 
        {value:'10.5', available:true}, 
        {value:'11', available:true}, 
        {value:'11.5', available:true}, 
        {value:'12', available:true}, 
        {value:'12.5', available:true}, 
        {value:'13', available:true}, 
        {value:'14', available:true}, 
        {value:'15', available:true}
    ];
    const availableSizes = getAvailableSizes(size,notAvailable);
    const handelChange = (data)=>{
        if(type=='single'){
            handler([data])
        }
        else if(type == "multi"){
            if(choosed.includes(data)){
                handler(choosed.filter(item=>item!== data))
            }else{
                handler([...choosed,data])
            }
        }
    }
   
    return <div className={styles['size-select']}>
        {availableSizes.map((item,index)=>
            <div 
                key={index} 
                className={`${styles['size-item']} ${choosed.includes(item.value)?styles.active:''} ${!item.available?styles.disabled:''}`}
                onClick={()=>handelChange(item.value)}
                >
                {item.value}
            </div>
        )}
    </div>
}
 
export default SizeSelect;