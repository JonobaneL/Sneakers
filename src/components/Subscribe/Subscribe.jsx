import React from 'react';
import SInput from '../UI/input/SInput';
import styles from './Subscribe.module.scss'
const Subscribe = () => {
    return (
        <div className={styles.subscribe}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <h2>Find Your Next Pair of Shoes at Sneakers</h2>
                    <p>Subscribe and be the first who receive information about discounts and new products</p>
                </div>
                <div className={styles.emailForm}>
                    <SInput height="40px" params={{placeholder:"E-mail"}} />
                    <button className={styles.singUpButton}>SING UP</button>
                </div>
            </div>
        </div>
    );
};


export default Subscribe;