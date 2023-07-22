import { forwardRef } from 'react';
import styles from './CInput.module.scss'

const CInput = forwardRef(({mode,height,valid,...inputParams},ref) => {
    // const {mode,height,valid,...inputParams} = params;
    const inputHeight = height || '40';
    const inputType = mode || 'underline';

    if(inputType=='underline')
        return <input className={`${styles.input} ${styles['underline']} ${styles.error}`} style={{height:`${inputHeight}px`}} {...inputParams} ref={ref}/>
    else if(inputType=='fullBorder')
        return <input className={`${styles.input} ${styles['full-border']} ${valid?styles.error:''}`} style={{height:`${inputHeight}px`}} {...inputParams} ref={ref}/>
});

export default CInput;