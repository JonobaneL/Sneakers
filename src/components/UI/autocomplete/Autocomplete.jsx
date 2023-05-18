import { useState } from 'react';
import styles from './Autocomplete.module.scss'
const Autocomplete = ({children,data,query,setChoosed,setQuery}) => {
    const [flag,setFlag] = useState(false)
    const fieldHandler = ()=>{
        setFlag(true)
    }

    return (
        <div className={styles['autocomplete']}>
            <div tabIndex={1} onFocus={fieldHandler}>
                {children}
            </div>
            {
                (query.length>0 && flag) && (
                    <ul className={styles['autocomplete-result']}>
                        {
                            data.map(item=>
                                <li
                                    key={item.id}
                                    className={styles['autocomplete-result__item']}
                                    onClick={()=>{
                                        setChoosed(item)
                                        setQuery(item.name)
                                        setFlag(false)
                                    }} 
                                >
                                    {item.name}
                                </li>
                            )
                        
                        }
                    </ul>
                )
            }
            
        </div>
    );
};

export default Autocomplete;