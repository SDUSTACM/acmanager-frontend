import styles from './index.css';
import AdminSiderBarLayout from './AdminSiderBarLayout';
import UserSiderBarLayout from './UserSiderBarLayout';
import MainLayout from './MainLayout';

function GlobalLayout(props) {
  if (props.location.pathname.startsWith('/admin')) {
    return <AdminSiderBarLayout {...props} />;
  } else if (props.location.pathname.startsWith('/setting')) {
    return <UserSiderBarLayout {...props} />;
  } else {
    return <MainLayout {...props} />
  }
  // return BasicLayout(props);
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
