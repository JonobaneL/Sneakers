import styles from './Toast.module.scss'
import { useToast } from '../../hooks/useToast';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDom from 'react-dom'


const ToastItem = ({item,deleteHandler})=>{
    setTimeout(()=>{
        deleteHandler(item.id)
    },2000)
    return (
        <motion.li
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring",duration:0.5 }}
        className={`${styles.toast__item} ${styles[item.type]}`}
        // onClick={()=>deleteHandler(item.id)}
        >
        {item.title}
        <div className={`${styles.progress} ${styles[item.type]}`}/>
        </motion.li>
    )
}

const Toast = () => {
    const {toasts,addToast,removeToast} = useToast();
    console.log("com",toasts)

    return ReactDom.createPortal(
        
        <ul className={styles.toast}>
            <li onClick={()=>addToast('success','sdfsdf')}>add</li>
            <AnimatePresence mode='sync'>
                {
                    toasts.map((item)=>
                       <ToastItem key={item.id} item={item} deleteHandler={removeToast} />
                    )
                }
            </AnimatePresence>
        </ul>,
        document.getElementById('toast')
    );
};


export default Toast;