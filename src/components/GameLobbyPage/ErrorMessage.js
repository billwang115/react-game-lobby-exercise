import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.errorCard}>
      <h2 className={styles.errorText}>Error: {message}</h2>
    </div>
  );
};

export default ErrorMessage;
