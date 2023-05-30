import standartStyles from '../commonStyles.module.scss'
import styles from './ContactUs.module.scss'
import phone from '../../../images/phone.svg'
import facebook from '../../../images/facebook.svg'
import instagram from '../../../images/instagram.svg'
import mail from '../../../images/mail.svg'
import { Link } from 'react-router-dom'

const ContactUs = () => {
    return (
        <div className={standartStyles.wrapper}>
            <div className={standartStyles.content}>
                <h1 className={standartStyles.title}>Contact Us</h1>
                <div className={styles.contacts}>
                    <div className={styles.type}>
                        <img src={phone} alt="phone-nuber" />
                        <p className={styles.info}>+38 (099) 999-99-99</p>
                    </div>
                    <div className={styles.type}>
                        <img src={mail} alt="email" />
                        <p className={styles.info}>sneakers.ua@gmail.com</p>
                    </div>
                    <div className={styles.type}>
                        <img src={facebook} alt="facebook" />
                        <Link to='https://www.instagram.com/' className={styles.info}>Sneakers.ua</Link>
                    </div>
                    <div className={styles.type}>
                        <img src={instagram} alt="instagram" />
                        <Link to='https://www.facebook.com/' className={styles.info}>sneakers_ua</Link>
                    </div>
                </div>
                
                <iframe className={styles.map} src="https://www.google.com/maps/d/embed?mid=1L4jDyWfvatki_XKJut20PlZ8WaTw2a0&ehbc=2E312F"></iframe>
            </div>
        </div>
    );
};


export default ContactUs;