import styles from './Toast.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import ReactDom from 'react-dom'
import { useEffect, useState } from 'react';
import successIcon from '../../images/toast-icons/success.svg'
import warningIcon from '../../images/toast-icons/warning.svg'
import errorIcon from '../../images/toast-icons/error.svg'

const TYPE = [
    {name:'success',icon:successIcon},
    {name:'warning',icon:warningIcon},
    {name:'error',icon:errorIcon},
]
const ToastItem = ({item,deleteHandler})=>{
    setTimeout(()=>{
        deleteHandler(item.id)
    },6000)
    return (
        <motion.li
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring",duration:0.5 }}
        className={`${styles.toast__item} ${styles[item.type]}`}
        >
            <img className={styles.icon} src={item.icon} alt='suka' />
            {item.title}
            <div className={`${styles.progress} ${styles[item.type]}`}/>
        </motion.li>
    )
}

const Toast = ({title,type,triger,handler}) => {
    const [toasts,setToasts] = useState([])
    const currentType = TYPE.filter(i=>i.name === type);

    useEffect(()=>{
        if(triger==true){
            setToasts(prev=>[...prev,{id:`${Date.now()}`,title,type,icon:currentType.icon}])
        }
        handler(false)
    },[triger])
    const removeToast = (id)=>{
        setToasts(p=>p.filter(item=>item.id!==id))
    }
    return ReactDom.createPortal(
        <AnimatePresence>
            {
                toasts.length>0&&<ul className={styles.toast}>
                <AnimatePresence mode='sync'>
                    {
                        toasts.map((item)=>
                        <ToastItem key={item.id} item={item} deleteHandler={removeToast} />
                        )
                    }
                </AnimatePresence>
            </ul>
            }
            
        </AnimatePresence>
        ,
        document.getElementById('toast')
    );
};


export default Toast;