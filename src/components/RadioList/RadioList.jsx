import { useState } from 'react';
import RadioButton from '../UI/radioButton/RadioButton';
import styles from './RadioList.module.scss'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const RadioList = ({list,groupName,children}) => {
    const [choosedItem,setChoosedItem] = useState()
    return (
        <div className={styles['shipping-list']}>
            <LayoutGroup>
            {list.map((item,index)=>
                <motion.div
                    key={item.id}
                    layout
                    className={`${styles["shipping-list__item"]} ${choosedItem === item.value?styles.active:''}`}
                >   
                <motion.label className={styles['option-head']} layout>
                    <RadioButton id={item.id} name={groupName} value={item.value} onChange={e=>setChoosedItem(e.target.value)} />
                    {item.label}
                </motion.label>
                <AnimatePresence mode='popLayout'>
                    {
                        choosedItem === item.value?<motion.div 
                        layout
                        initial={{
                        opacity:0,
                        }}
                        animate={{
                        opacity:1,
                        }}
                        exit={{
                            opacity:0,
                        }}
                        transition={{
                            duration:0.3
                        }}
                        className={`${styles["option-body"]}`}>
                        {children[index]}
                    </motion.div>
                    :null
                    }
                </AnimatePresence>
                </motion.div>
            )}
            </LayoutGroup>
            
        </div>
    );
};


export default RadioList;