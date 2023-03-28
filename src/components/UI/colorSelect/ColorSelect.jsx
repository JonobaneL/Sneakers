import React,{useState} from "react";
import { Link, useParams } from "react-router-dom";
import styles from './ColorSelect.module.scss'


const ColorSelect = ({colors,poitedColor}) => {
    const {id,colorId} =useParams()
    const [selectedColor,setSelectedColor] = useState(colorId)
    console.log(selectedColor)
    return <div className={styles["color-select"]}>
        {
            colors.map(item=>
                <Link key={item.id} to={`/product/${id}/${item.id}`}>
                    <div 
                        className={`${styles.color__item} ${selectedColor == item.id?styles.active:''}`} 
                        onMouseEnter={e=>{
                            e.preventDefault();
                            poitedColor(item.title);
                        }}
                        onClick={e=>{
                            setSelectedColor(item.id)
                        }}
                        >
                        <img src={item.images[1]} alt={item.title} />
                    </div>
                </Link>
                )
        }
    </div>;
}
 
export default ColorSelect;