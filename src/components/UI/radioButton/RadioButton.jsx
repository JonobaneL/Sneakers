import styles from './RadioButton.module.scss'

const RadioButton = (props) => {
    return <>
    <input type="radio" className={styles['radio-button']} {...props} />
    <span className={styles.indicator}></span>
    </>
}
 
export default RadioButton;