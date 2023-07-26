import ReactDom from 'react-dom'
import styles from './ModalWindow.module.scss'
import closeIcon from '../../images/cancel.svg'
import { AnimatePresence,motion } from 'framer-motion';

const ModalWindow = ({children,isOpen,closeHandler,title,width}) => {
    if(isOpen) {
        document.body.style.overflowY='hidden'
    }else{
        document.body.style.overflowY='auto'
    }
    return ReactDom.createPortal(
        <AnimatePresence initial={false}>
            {
                isOpen && (
                    <motion.div 
                        className={styles['modal-wrapper']} 
                        onClick={e=>closeHandler()}
                        animate={{
                            background:'rgba(0,0,0,0.5)'
                        }}
                        exit={{
                            background:'rgba(0,0,0,0)'
                        }}
                    >
                        <motion.div 
                            className={styles['modal-window']} 
                            onClick={e=>e.stopPropagation()}
                            initial={{
                                opacity:0,
                                translateY:300,
                                width: Math.min(width,window.screen.availWidth)
                            }}
                            animate={{
                                opacity:1,
                                translateY:0,
                            }}
                            exit={{
                                opacity:0,
                                translateY:300,
                            }}
                            transition={{
                                duration:0.3
                            }}
                            >
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
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
        
    ,document.getElementById('modalWindow'))
};


export default ModalWindow;