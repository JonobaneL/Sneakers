import React from 'react';
import ReactDom from 'react-dom'
import styles from './Toast.module.scss'
import successIcon from '../../images/toast-icons/success.svg'
import warningIcon from '../../images/toast-icons/warning.svg'
import errorIcon from '../../images/toast-icons/error.svg'

const Toast = ({type,open=false,closeHandler,children}) => {
    if(!open) return null

   const TYPES=[
    {name:"success",color:"green",icon:successIcon},
    {name:"warning",color:"#FFBF00",icon:warningIcon},
    {name:"error",color:"#CF000F",icon:errorIcon},
   ]
const toastType = TYPES.find(item=>item.name === type);
   setTimeout(()=>{
    closeHandler()
   },2000)
   
    return ReactDom.createPortal(<div  className={styles.toast}>
        <div className={styles.content}>
            <img className={styles['toast-icon']} src={toastType.icon} alt={toastType.name} />
            {children}
        </div>
            <div style={{background:toastType.color}} className={styles.progress}/>
        </div>,
        document.getElementById('toast')
        )
};

export default Toast;