import React from 'react';
import styles from './index.css';
import { connect } from 'dva';
import AdminSiderBarLayout from './AdminSiderBarLayout';
import UserSiderBarLayout from './UserSiderBarLayout';
import MessageSiderBarLayout from './MessageSiderBarLayout';
import AdminTrainingSiderBarLayout from './AdminTrainingSiderBarLayout';
import MainLayout from './MainLayout';

/**
 * TODO：路由匹配优化，这里应该需要用数据结构优化匹配算法，目前是随便写的
 */
function getLayout(props) {
  // const prefix_to_layout = {
  //   "admin/trainings/": () => 
  // }
  const pathname = props.location.pathname; 
  if (pathname.startsWith('/admin/trainings/')) {
    return <AdminTrainingSiderBarLayout {...props} />;
  } else if (pathname.startsWith('/admin')) {
    return <AdminSiderBarLayout {...props} />;
  } else if (pathname.startsWith('/setting')) {
    return <UserSiderBarLayout {...props} />;
  } else if (pathname.startsWith('/login')){
    return <BasicLayout {...props} />;
  } else if (pathname.startsWith('/message')) {
    return <MessageSiderBarLayout {...props} />;
  } else {
    return <MainLayout {...props} />
  }
}
@connect((state) => ({is_admin: state.user.roles.includes("ADMIN")}))
class GlobalLayout extends React.Component {
  render() {
    return getLayout(this.props);
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
