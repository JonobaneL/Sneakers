import { useState } from 'react';
import RadioButton from '../UI/radioButton/RadioButton';
import styles from './RadioList.module.scss'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const RadioList = ({list,groupName,children}) => {
    const [choosedItem,setChoosedItem] = useState();
    const optionVariants = {
        visible:{
            opacity:1,
            height:'fit-content'
        },
        hidden:{
            opacity:0,
            height:0,
        }
    }
    return (
        <div className={styles['radio-list']}>
            <LayoutGroup>
            {list.map((item,index)=>
                <motion.div
                    key={item.id}
                    layout
                    className={`${styles["radio-list__item"]} ${choosedItem === item.value?styles.active:''}`}
                >   
                    <motion.label className={`${styles['option-head']} ${item.disabled?styles.disabled:''}`} layout >
                        <RadioButton id={item.id} name={groupName} value={item.value} onChange={e=>setChoosedItem(e.target.value)} disabled={item.disabled} />
                        {item.label}
                    </motion.label>
                    <AnimatePresence mode='wait' initial={false}>
                        {
                            choosedItem === item.value?<motion.div 
                            layout
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            variants={optionVariants}
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