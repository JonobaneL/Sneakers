import React from 'react';
import SocialMedia from '../socialMedia/socialMedia';
import styles from './Footer.module.scss'


const Footer=()=> {
    return <footer className={styles.footer}>
        <div className={styles.content}>
        <SocialMedia/>
        <ul className={styles.ruleList}>
            <li className={styles.ruleList__item}>Privacy Policy</li>
            <li className={styles.ruleList__item}>Terms & Conditions</li>
            <li className={styles.ruleList__item}>Supply Chain Act</li>
        </ul>
        </div>
    </footer>;
}

export default Footer;