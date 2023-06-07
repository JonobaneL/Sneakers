import styles from './Toast.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import ReactDom from 'react-dom'
import { useEffect, useState } from 'react';
import successIcon from '../../images/toast-icons/success.svg'
import warningIcon from '../../images/toast-icons/warning.svg'
import errorIcon from '../../images/toast-icons/error.svg'

const ToastItem = ({item,deleteHandler})=>{
    setTimeout(()=>{
        deleteHandler(item.id)
    },(item.autoCloseTime*1000))
    const iconType = (type)=>{
        switch(type){
            case "success":
                return successIcon
            case "warning":
                return warningIcon
            case "error":
                return errorIcon
        }
       }
    const icon = iconType(item.type);
    return (
        <motion.li
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring",duration:0.4 }}
        className={`${styles.toast__item} ${styles[item.type]}`}
        >
            {
                item.type!=='none'&& <img className={styles.icon} src={icon} alt={`${item.type}-icon`} />
            }
            {item.title}
            <div style={{animationDuration:`${item.autoCloseTime}s`}} className={`${styles.progress} ${styles[item.type]}`}/>
        </motion.li>
    )
}

const Toast = ({title,type,triger,closeHandler,autoCloseTime=2}) => {
    const [toasts,setToasts] = useState([])
    useEffect(()=>{
        if(triger==true){
            setToasts(prev=>[...prev,{id:`${Date.now()}`,title,type,autoCloseTime}])
        }
        closeHandler(false)
    },[triger])
    const removeToast = (id)=>{
        setToasts(p=>p.filter(item=>item.id!==id))
    }
    return ReactDom.createPortal(
        <AnimatePresence initial={false}>
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