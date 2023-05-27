import { forwardRef } from 'react';
import styles from './CInput.module.scss'

const CInput = forwardRef((params,ref) => {
    const inputType = params.id.split('-')[1] || 'underline';
    const inputHeight = params.id.split('-')[2] || '40';
    if(inputType=='underline')
    return <input className={`${styles.input} ${styles['underline']}`} style={{height:`${inputHeight}px`}} {...params} ref={ref}/>
    else if(inputType=='fullBorder')
    return <input className={`${styles.input} ${styles['full-border']}`} style={{height:`${inputHeight}px`}} {...params} ref={ref}/>
});

export default CInput;