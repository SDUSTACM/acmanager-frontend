import LoginPage from './Login';
import styles from './index.css';
export default function() {
  return (
    <div className={styles.main}>
      <LoginPage />
    </div>
    // <div className={styles.normal}>
    //   <h1>Page login</h1>
    // </div>
  );
}
