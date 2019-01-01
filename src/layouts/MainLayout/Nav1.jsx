import React from 'react';
import { connect } from "dva";
import { findDOMNode } from 'react-dom';
import TweenOne from 'rc-tween-one';
import { Menu, Icon, Badge, Popover } from 'antd';
import router from 'umi/router';
import Notification from './NotificationMenu';
const { Item, SubMenu } = Menu;

/**
 * 高阶组件，用来赋予Item根据用户角色来选择性呈现的能力
 */
function WithRolePermission(WrappedComponent) {
  return (
    connect((state) => {
      return { roles: state.user.roles };
    })(
    class extends React.Component {
      constructor(props) {
        super(props);
      } 
      render() {
        const { allow_roles, roles } = this.props;
        /** some, every, map, forEach, find, filter */
        if (roles.some((v) => allow_roles.includes(v))) {
          return (
              <WrappedComponent {...this.props} />
          );
        } 
        return (<div></div>);
      }
    })    
  )
}
const RoleItem = WithRolePermission(Item);
RoleItem.defaultProps = {
  allow_roles: ['EVERYBODY']
};
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      menuHeight: 0,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/session'
    });
  }
  phoneClick = () => {
    const menu = findDOMNode(this.menu);
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
      menuHeight: phoneOpen ? menu.scrollHeight : 0,
    });
  };
  
  render() {
    const { ...props } = this.props;
    const { dataSource, isMobile, dispatch } = props;
    delete props.dataSource;
    delete props.isMobile;
    delete props.dispatch;
    const { menuHeight, phoneOpen } = this.state;
    const navData = dataSource.Menu.children;
    const navChildren = Object.keys(navData).map((key, i) => (
      <Item {...navData[key]} key={i.toString()}>
        <a
          {...navData[key].a}
          onClick={() => router.push(navData[key].a.link)}
          target={navData[key].a.blank && '_blank'}
        >
          {navData[key].a.children}
        </a>
      </Item>
    ));

    // user 涉及到数据，请自行替换。
    const userTitle = (
      <div {...dataSource.user}>
        {/* <span className="img" {...dataSource.user.img}>
           <img
            src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
            width="100%"
            height="100%"
            alt="img"
          /> 
        </span> */}
        <span>{this.props.user.username?this.props.user.nick: "未登录"}</span>
      </div>
    );
    navChildren.push(
      <Item {...dataSource.help} key="help">

        <Notification />
        {/* <span>{dataSource.help.children}</span> */}
      </Item>,
      this.props.user.username?(
      <SubMenu className="user" title={userTitle} key="user">
        <RoleItem key="d" allow_roles={["CONFIRM"]} onClick={() => router.push(`/statistic/${this.props.user.username}`)}>个人题数统计</RoleItem> 
        <Item key="a" onClick={() => router.push('/setting')}>用户中心</Item>
        {/* <RoleComponent( */}
        <RoleItem key="b" allow_roles={["ADMIN"]} onClick={() => router.push('/admin')}>管理后台</RoleItem>
        {/* ) /> */}
        <Item key="c" onClick={() => this.props.dispatch({ type: "user/logout" })}>登出</Item>
      </SubMenu>):
      (<SubMenu  className="user" title={userTitle} key="user">
        <Item key="a" onClick={() => router.push("/login") } >登录</Item>
      </SubMenu>)

    );
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}
      >
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
        >
          <TweenOne
            animation={{
              x: -30,
              delay: 100,
              type: 'from',
              ease: 'easeOutQuad',
            }}
            {...dataSource.logo}
          >
            <img width="100%" src={dataSource.logo.children} alt="img" />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
          )}
          <TweenOne
            {...dataSource.Menu}
            animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            ref={(c) => {
              this.menu = c;
            }}
            style={isMobile ? { height: menuHeight } : null}
          >
            <Menu
              mode={isMobile ? 'inline' : 'horizontal'}
              defaultSelectedKeys={[props.select_id]}
              theme={isMobile ? 'dark' : 'default'}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}
function mapStateToProps(state) {
  let { username, nick, roles } = state.user;
  return {
    select_id: state.nav.select_id,

    user: {
      username, nick, roles
    }
  };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
