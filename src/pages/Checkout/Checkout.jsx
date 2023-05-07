import styles from './Checkout.module.scss'

const Checkout = () => {
    return <div className={styles.checkout}>
        <div className={styles.content}>
        <h1 className={styles.title}>Checkout</h1>
        <div className={styles["order-form"]}></div>
        <div className={styles["order-summary"]}></div>
        </div>
    </div>;
}
 
export default Checkout;