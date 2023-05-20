import styles from './ClearButton.module.scss'

const ClearButton = ({triger,handler}) => {
    if(triger<=0) return 
    
    return ( 
        <button
            className={styles.clear}
            onClick={e=>{
                e.stopPropagation();
                handler()
            }}
        >Clear</button>
     );
}
 
export default ClearButton;