import { AnimatePresence, motion } from 'framer-motion';
import styles from './DropDownMenu.module.scss'

const DropDownMenu = ({children,triger}) => {
    return (
        <AnimatePresence initial={false}>
            {
                triger && (
                    <motion.div 
                    initial={{
                        y:-10,
                        opacity:0
                    }}
                    animate={{
                        y:0,
                        opacity:1
                    }}
                    exit={{
                        y:10,
                        opacity:0
                    }}
                    transition={{
                        duration:0.2
                    }}
                    className={styles.menu}>
                        {children}
                    </motion.div>
                )
            }
            
        </AnimatePresence>
    );
};


export default DropDownMenu;