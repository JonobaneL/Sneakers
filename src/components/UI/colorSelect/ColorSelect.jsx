import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import styles from './ColorSelect.module.scss'


const ColorSelect = ({models,poitedColor}) => {
    const {id,modelId} =useParams()
    const [selectedColor,setSelectedColor] = useState(modelId)
    return <div className={styles["color-select"]}>
        {
            models.map(item=>
                <Link key={item.id} to={`/product/${id}/${item.id}`}>
                    <div 
                        className={`${styles.color__item} ${selectedColor == item.id?styles.active:''}`} 
                        onMouseEnter={e=>{
                            e.preventDefault();
                            poitedColor(item.name);
                        }}
                        onMouseLeave={e=>{
                            e.preventDefault();
                            poitedColor(selectedColor.name);
                        }}
                        onClick={e=>{
                            setSelectedColor(item.id)
                        }}
                        >
                        <img src={item.images[1]} alt={item.name} />
                    </div>
                </Link>
                )
        }
    </div>;
}
 
export default ColorSelect;