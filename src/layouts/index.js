import styles from './index.css';
import SiderBarLayout from './SiderBarLayout';


function GlobalLayout(props) {
  if (props.location.pathname === '/admin') {
    return <SiderBarLayout {...props} />;
  }
  return BasicLayout(props);
}
function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      {/* <h1 className={styles.title}>Yay! Welcome to umi!</h1> */}
      { props.children }
    </div>
  );
}

export default GlobalLayout;
