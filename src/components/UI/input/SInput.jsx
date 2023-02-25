import styles from './SInput.module.scss'

const SInput = (props) => {
    return  <input className={styles.sInput} {...props}/>;
}
 
export default SInput;