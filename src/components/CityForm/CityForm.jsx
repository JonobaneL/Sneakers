import { useEffect, useState } from 'react';
import styles from './CityForm.module.scss'
import { popularCities } from '../../data/shipping-data';
import CInput from '../UI/input/CInput';
import Autocomplete from '../UI/autocomplete/Autocomplete';
import Button from '../UI/button/Button';

const CityForm = ({currentCity,setCity,applyCallback}) => {
    const [choosedCity,setChoosedCity] = useState(currentCity)
    const [query,setQuery] = useState(currentCity.name || '');
    const windowWidth = window.screen.availWidth<=425;
    const [isValid,setIsValid] = useState(true)
    const popularLocatinHandler = (item)=>{
        if(item.id!==choosedCity.id) {
            setChoosedCity(item);
            setQuery(item.name)
        }
    }
    const applyButtonHandler = ()=>{
        setCity(choosedCity);
        applyCallback();
    }
    useEffect(()=>{
       if(choosedCity.id !== currentCity.id) setIsValid(false)
    },[choosedCity.id])
    return (
        <div className={styles.location}>
            <div className={styles.advertisement}>
                We deliver orders all over Ukraine!
            </div>
            <div className={styles["popular-locations"]}>
                {popularCities.map(item=>
                    <div 
                        key={item.id} 
                        className={`${styles['popular-locations__item']} ${choosedCity.id===item.id?styles.active:''}`}
                        onClick={()=>popularLocatinHandler(item)}
                        >
                            {item.name}
                        </div>
                    )}
            </div>
            <div className={styles['location-search']}>
                <p className={styles['location-search__title']}>Specify the settlement of Ukraine</p>
                <Autocomplete query={query} setQuery={setQuery} >
                    <CInput  
                        value={query} 
                        onChange={e=>setQuery(e.target.value)} 
                        id="location" 
                        mode='fullBorder'
                        height={45}
                        placeholder="Choose your city"
                        />
                </Autocomplete>
            </div>
            <div className={styles['apply-location']}>
                <Button 
                    mode='primary'
                    width={`${windowWidth?'100%':'100px'}`}
                    disabled={isValid}
                    onClick={applyButtonHandler}
                >Apply</Button>
            </div>
            <div className={styles["location-caption"]}>
                Choosing a city will help provide up-to-date information about available delivery methods in your city! This will help save more free time for you!
            </div>
        </div>
    );
};

export default CityForm;