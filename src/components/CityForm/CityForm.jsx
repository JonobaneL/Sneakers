import { useEffect, useState } from 'react';
import styles from './CityForm.module.scss'
import deliveryTruck from '../../images/delivery-truck.svg'
import { popularCities } from '../../data/shipping-data';
import CInput from '../UI/input/CInput';
import SearchField from '../UI/autocomplete/Autocomplete';
import { findLocation } from '../../utils/searchLocation';

const CityForm = ({currentCity,setCity,closeHandler}) => {
    const [choosedCity,setChoosedCity] = useState(currentCity)
    const [query,setQuery] = useState(currentCity.name || '');
    const [isValid,setIsValid] = useState(true)
    const locationResult = findLocation(query);
    const popularLocatinHandler = (item)=>{
        if(item.id!==choosedCity.id) {
            setChoosedCity(item);
            setQuery(item.name)
        }
    }
    const applyButtonHandler = ()=>{
        setCity(choosedCity);
        closeHandler();
    }
    useEffect(()=>{
       if(choosedCity.id !== currentCity.id) setIsValid(false)
    },[choosedCity.id])
    return (
        <div className={styles.location}>
            <div className={styles.advertisement}>
                <img src={deliveryTruck} alt="delivery-truck" />
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
                <SearchField data={locationResult} setChoosed={setChoosedCity} query={query} setQuery={setQuery} >
                    <CInput  value={query} onChange={e=>setQuery(e.target.value)} id="location-fullBorder-40" placeholder="Choose your city"/>
                </SearchField>
            </div>
            <div className={styles['apply-location']}>
                <button className={styles.apply__button}
                 disabled={isValid}
                 onClick={applyButtonHandler}
                >Apply</button>
            </div>
            <div className={styles["location-caption"]}>
                Choosing a city will help provide up-to-date information about available delivery methods in your city! This will help save more free time for you!
            </div>
        </div>
    );
};

export default CityForm;