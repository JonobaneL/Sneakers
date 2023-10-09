import styles from "./ValidationErrorMessages.module.scss";

const ValidationErrorMessages = ({ children, durty, errorMessages }) => {
  return (
    <div className={styles.wrapper}>
      {children}
      {durty && errorMessages.length > 0 ? (
        <div className={styles.message}>
          {errorMessages[errorMessages.length - 1]}
        </div>
      ) : null}
    </div>
  );
};

export default ValidationErrorMessages;
