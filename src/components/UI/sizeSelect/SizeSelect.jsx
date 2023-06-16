import React from "react";
import { getAvailableSizes } from "../../../utils/getAvailablesizes";
import { size } from "../../../data/sizeList";
import styles from './SizeSelect.module.scss';

const SizeSelect = ({notAvailable='',choosed,handler,type}) => {
    const sizes = [...size];
    const availableSizes = getAvailableSizes(sizes,notAvailable);
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