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
    return <div className={styles.about}>
        <div className={styles.content} >
            <button
            className={styles.btn}
                onClick={()=>setIsOpen(p=>!p)}
            >Open</button>
            <div className={styles.wrapper}>
                <div className={styles.block}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita natus blanditiis at culpa assumenda? Neque cum distinctio, quod nam autem ratione error placeat est natus itaque, veniam tempore, debitis ullam?
                    Quisquam praesentium sed deleniti veritatis tempore atque quo, quam error illo distinctio vitae totam ipsa quis perspiciatis accusantium. Accusamus facere culpa nemo nobis voluptates reiciendis saepe eum corrupti, neque consequuntur.</p>
                    
                    <div className={styles.section}>
                        <div className={styles["section-header"]} onClick={()=>setIsOpen(p=>!p)}>Select</div>
                        <div className={`${styles["section-body"]} ${isOpen?styles.active:''}`}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam ipsam sunt id delectus, corrupti expedita exercitationem quasi quisquam, quaerat odit necessitatibus atque quibusdam mollitia ad aliquid facilis optio perspiciatis. Nihil.
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>;
}
 
export default About;