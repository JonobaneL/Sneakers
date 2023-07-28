import React from 'react';
import styles from './AddressesList.module.scss'
import closeIcon from '../../images/cancel.svg'


const AddressesList = ({addresses}) => {
    if(addresses.length===0) {
        return (
            <div className={styles.notice}>
                <p>You currently don’t have any saved delivery addresses. Add a address here to be prefilled for quicker checkout.</p>
            </div>
        )
    }
    const deleteMethod = ()=>{
        
    }
    return (
        <ul className={styles['addresses-list']}>
            {
                addresses.map((item,index)=>{
                    return <li key={index} className={styles.list__item}>
                        <p>{index+1}.</p>
                        <div className="">
                            <p>{item.company==='novaposhta'?'Nova Poshta':'Ukr Poshta'}</p>
                            {
                                item.address && <>
                                    <p>Addres: {item.address}</p>
                                    <p>Appartment: {item.appartment}</p>
                                </>
                            }
                            {
                                item.postal_office && <>
                                    <p>Postal Office: {item.postal_office}</p>
                                </>
                            }
                        </div>
                        <div className={styles['button-bar']}>
                            <button className={styles['edit-btn']}>Edit</button>
                            <button className={styles.delete} onClick={()=>deleteMethod(item.methodID)}>
                                <img src={closeIcon} alt="close" />
                            </button>
                        </div>
                    </li>
                })
            }
        </ul>
    );
};

export default AddressesList;