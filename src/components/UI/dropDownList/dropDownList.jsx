import React, {memo,useEffect,useState} from 'react';

import DropDownListItem from '../DropDownListItem/DropDownListItem';
import styles from './dropDonwList.module.scss'

const DropDownList = memo(({handler, data}) => {
    const [choosedCategory,setChoosedCategory] = useState({id:1,name:''})
    const clearEvent = ()=>{
        handler("")
        setChoosedCategory({
            id:1,
            name:''
        })
    }
    // useEffect(()=>{
    //     getData(choosedCategory.name)
    // },[choosedCategory])
    const VISIBLE = {display:"block"};
    const INVISIBLE = {display:"none"};
    return (
        <div className={styles.dropDownList}>
            <div style={choosedCategory.name.length?VISIBLE:INVISIBLE} className={styles['choosed-category']}>
                <p className={styles["all-category"]} onClick={clearEvent}>&#60; All categories</p>
                <DropDownListItem 
                    fixed={true}
                    data={choosedCategory} 
                    getData={(element)=>{
                        console.log(element)
                        handler(element.name)
                        setChoosedCategory(element);
                        }
                    }/>

            </div>
            <div style={choosedCategory.name.length?INVISIBLE:VISIBLE}>
                {
                    data.map(item=>
                        <DropDownListItem 
                            key={item.id} 
                            data={item} 
                            getData={(element)=>{
                                handler(element.name)
                                setChoosedCategory(element)
                            }
                        }/>
                    )
                }
            </div>
            
        </div>
    );
});


export default DropDownList;