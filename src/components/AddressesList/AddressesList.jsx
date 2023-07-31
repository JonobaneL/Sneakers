import React from 'react';
import styles from './AddressesList.module.scss'
import closeIcon from '../../images/cancel.svg'
import { updateDeliveryAddresses } from '../../firebase/userFirebaseAPI';


const AddressesList = ({addresses,userId,triger}) => {
    if(addresses.length===0) {
        return (
            <div className={styles.notice}>
                <p>You currently don’t have any saved delivery addresses. Add a address here to be prefilled for quicker checkout.</p>
            </div>
        )
    }
    const deleteMethod = async(id)=>{
        const filteredAddresses = addresses.filter(item=>item.addressID!==id)
        try{
            await updateDeliveryAddresses(userId,filteredAddresses)
            triger();
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <ul className={styles['addresses-list']}>
            {
                addresses.map((item,index)=>{
                    return <li key={index} className={styles.list__item}>
                        <p>{index+1}.</p>
                        <div>
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
                            <button className={styles.delete} onClick={()=>deleteMethod(item.addressID)}>
                                <img src={closeIcon} alt="close" />
                            </button>
                    </li>
                })
            }
        </ul>
    );
};

export default AddressesList;