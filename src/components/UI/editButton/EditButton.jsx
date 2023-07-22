import React from 'react';
import styles from './EditButton.module.scss'
import editIcon from '../../../images/edit-icon.svg'

const EditButton = ({children,...props})=>{
    return <button className={styles['edit-button']} {...props}>
        <img src={editIcon} alt="Edit cart" />
        {children}    
    </button>
}
export default EditButton;