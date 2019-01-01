import React from 'react';
import styles from './index.css';
import { connect } from 'dva';
import AdminSiderBarLayout from './AdminSiderBarLayout';
import UserSiderBarLayout from './UserSiderBarLayout';
import MessageSiderBarLayout from './MessageSiderBarLayout';
import MainLayout from './MainLayout';

@connect((state) => ({is_admin: state.user.roles.includes("ADMIN")}))
class GlobalLayout extends React.Component {
  render() {
    const props = this.props;
    if (props.location.pathname.startsWith('/admin')) {
      return <AdminSiderBarLayout {...props} />;
    } else if (props.location.pathname.startsWith('/setting')) {
      return <UserSiderBarLayout {...props} />;
    } else if (props.location.pathname.startsWith('/login')){
      return <BasicLayout {...props} />;
    } else if (props.location.pathname.startsWith('/message')) {
      return <MessageSiderBarLayout {...props} />;
    } else {
      return <MainLayout {...props} />
    }
  }
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
