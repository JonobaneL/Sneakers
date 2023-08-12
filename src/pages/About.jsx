import React,{useState,useEffect,useMemo, useCallback, useRef} from 'react'
import styles from './about.module.scss'
import CInput from '../components/UI/input/CInput';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../fireAuthAPI';
import RadioList from '../components/RadioList/RadioList';
import RadioButton from '../components/UI/radioButton/RadioButton';

const About = () => {
    const [isOpen,setIsOpen] = useState(false);
    const [choosedItem,setChoosedItem] = useState();
    const [test,setTest] = useState();
    return <div className={styles.about}>
        <div className={styles.content} >
            
            
              
            
            
        </div>
    </div>;
}
 
export default About;