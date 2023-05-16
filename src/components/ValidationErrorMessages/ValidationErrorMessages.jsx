import styles from './ValidationErrorMessages.module.scss'


const ValidationErrorMessages = ({children,durty,errorMessages}) => {
    return ( 
        <div className={styles.wrapper}>
            {children}
            {durty?
                <ul className={styles.messages}>
                    <li className={styles.messages__item}>{errorMessages[errorMessages.length-1]}</li>
                    {/* {errorMessages.map((item,index)=>
                        <li key={index} className={styles.messages__item}>
                            {item}
                        </li>
                    )} */}
                </ul>
                :null
            }
            
        </div>
     );
}
 
export default ValidationErrorMessages;