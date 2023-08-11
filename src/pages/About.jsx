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
            <form>
                <div className={styles.wrapper}>
                    <div className={`${styles.item} ${choosedItem=='Payment upon receipt of goods'?styles.active:''}`}>
                        <label className={styles.item__label}>
                            <RadioButton id='item01' name='items' value='Payment upon receipt of goods' onChange={e=>setChoosedItem(e.target.value)}  />
                            Payment upon receipt of goods
                        </label>
                    </div>
                    <div className={`${styles.item} ${choosedItem=='Credit or Debit Card'?styles.active:''}`}>
                        <label className={styles.item__label}>
                            <RadioButton id='item02' name='items' value='Credit or Debit Card' onChange={e=>setChoosedItem(e.target.value)}  />
                            Credit or Debit Card
                        </label>
                        <div className={styles["item-body"]}>
                            <div className={styles.body__wrapper}>
                                <CInput mode='fullBorder' height='50' placeholder='Card Number'/>
                                <CInput mode='fullBorder' height='50' placeholder='MM/YY'/>
                                <CInput mode='fullBorder' height='50' placeholder='CVV'/>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.item} ${choosedItem=='PayPal'?styles.active:''}`}>
                        <label className={styles.item__label}>
                            <RadioButton id='item03' name='items' value='PayPal' onChange={e=>setChoosedItem(e.target.value)}  />
                            PayPal
                        </label>
                    </div>
                </div>
            </form>
            
            <div style={{border:'1px solid #b1b1b1',padding:'20px'}}>
                <div className={`${styles.card} ${isOpen?styles.active:''}`}>
                    <div className={styles["card-header"]}>Card Header</div>
                    <div className={styles["card-body"]}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur ut inventore velit vitae molestiae explicabo veritatis distinctio odit alias quod, saepe, praesentium, architecto non fuga repellat magnam soluta. Neque, facilis.
                        Dicta earum tenetur neque nihil quia odio architecto aut! Maxime laborum dolorem voluptate alias cumque culpa dicta at corrupti magnam laboriosam sed temporibus, assumenda molestias nostrum, aspernatur dignissimos tempora! Necessitatibus!
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>;
}
 
export default About;