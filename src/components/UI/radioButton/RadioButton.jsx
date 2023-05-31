import styles from './RadioButton.module.scss'

const RadioButton = (props) => {
    return <>
    <input type="radio" className={styles['radio-button']} {...props} />
    <span className={`${styles.indicator} ${props.disabled && styles.disabled}`}></span>
    </>
}
 
export default RadioButton;