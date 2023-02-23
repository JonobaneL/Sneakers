import React from 'react';
import styles from './Tabs.module.scss'
import adidas from '../../../images/adidas.png'
import converse from '../../../images/converse.png'
import crocs from '../../../images/crocs.png'
import vans from '../../../images/vans.png'

const Tabs = () => {
    return (
        <div className={styles.tabs}>
            <div className={styles.content}>
                <div className={styles.tab1}>
                    <img src="https://www.converse.com/on/demandware.static/-/Library-Sites-SharedLibrary/default/dwa57d84c7/firstspirit/media/19_landing_pages/2022_spring_5/student_discount/M-Converse-Student-Discount-LP-1.jpg" alt="" />
                    <div className={styles.info}>
                        <img className={styles.brand} src={converse} alt='logo' />
                    </div>
                </div>
                <div className={styles.tab2}>
                    <img src="https://s.0312.ua/section/promonewsintext/upload/images/promo/intext/000/055/195/1_63f63362bdfc2.png" alt="" />
                    <div className={styles.info}>
                        <img className={styles.brand} src={adidas} alt='logo' />
                    </div>
                </div>
                <div className={styles.tab3}>
                    <img src="https://footwearnews.com/wp-content/uploads/2022/10/crocs-2.jpg?w=1024" alt="" />
                    <div className={styles.info}>
                        <img className={styles.brand} src={crocs} alt='logo' />
                    </div>
                </div>
                <div className={styles.tab4}>
                    <img src="https://invitationdigital-res-1.cloudinary.com/image/upload/q_auto,f_auto,fl_strip_profile/d77be8dafeee40e4b5e55d10d75237ee" alt="" />
                    <div className={styles.info}>
                        <img className={styles.brand} src={vans} alt='logo' />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Tabs;