import React, {memo,useEffect,useState} from 'react';

import DropDownListItem from '../DropDownListItem/DropDownListItem';
import styles from './dropDonwList.module.scss'

const DropDownList = memo(({handler, data,seleted}) => {
    const searchCategory = ()=>{
        if(seleted.length>0){
            const mainCategory = data.find(item=>seleted.includes(item.name))
            const subCategory = mainCategory?.children?.find(item=>seleted.includes(item?.name))
            return subCategory?subCategory:mainCategory
        }else{
            return {id:1,name:''}
        }
        
    }
    const [choosedCategory,setChoosedCategory] = useState({id:1,name:''})
    const clearEvent = ()=>{
        handler([])
        setChoosedCategory({
            id:1,
            name:''
        })
    }
    useEffect(()=>{
        setChoosedCategory(()=>searchCategory())
    },[seleted.length])
    
    const VISIBLE = {display:"block"};
    const INVISIBLE = {display:"none"};
    return (
        <div className={styles.dropDownList}>
            <div style={choosedCategory?.name.length?VISIBLE:INVISIBLE} className={styles['choosed-category']}>
                <p className={styles["all-category"]} onClick={clearEvent}>&#60; All categories</p>
                <DropDownListItem 
                    fixed={true}
                    data={choosedCategory} 
                    getData={(element)=>{
                        handler(element.length>1?[element[0]?.name,element[1]?.name]:[element[0]?.name])
                        setChoosedCategory(element.length>1?element[1]:element[0]);
                        console.log('sdfsdf')
                        }
                    }/>

            </div>
            <div style={choosedCategory?.name.length?INVISIBLE:VISIBLE}>
                {
                    data.map(item=>
                        <DropDownListItem 
                            key={item.id} 
                            data={item} 
                            getData={(element)=>{
                                handler(element.length>1?[element[0]?.name,element[1]?.name]:[element[0]?.name])
                                setChoosedCategory(element.length>1?element[1]:element[0]);
                            }
                        }/>
                    )
                }
            </div>
            
        </div>
    );
});


export default DropDownList;