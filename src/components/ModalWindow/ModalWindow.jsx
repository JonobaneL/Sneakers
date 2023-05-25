import ReactDom from 'react-dom'
import styles from './ModalWindow.module.scss'
import closeIcon from '../../images/cancel.svg'

const ModalWindow = ({children,isOpen,closeHandler,title}) => {
    if(!isOpen) {
        document.body.style.overflowY='unset'
        return null;
    }
    document.body.style.overflowY='hidden'
    return ReactDom.createPortal(
        <div className={styles['modal-wrapper']} onClick={e=>{
            closeHandler()
            }}>
            <div className={styles['modal-window']} onClick={e=>e.stopPropagation()}>
                <div className={styles['modal-header']}>
                    <h2>{title}</h2>
                    <button
                        onClick={closeHandler}
                        className={styles.closeModal}
                    >
                       <img src={closeIcon} alt="" />
                    </button>
                </div>
                <div className={styles["modal-body"]}>
                    {children} 
                </div>
            </div>
        </div>
    ,document.getElementById('modalWindow'))
};


export default ModalWindow;