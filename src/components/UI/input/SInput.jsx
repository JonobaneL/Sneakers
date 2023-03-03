import styles from './SInput.module.scss'

const SInput = (props) => {
    return  <input style={{height:props.height}} className={styles.sInput} {...props.params}/>;
}

 
export default SInput;