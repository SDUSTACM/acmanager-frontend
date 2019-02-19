import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import router from 'umi/router';
import Nav1 from './MainLayout/Nav1';
import { enquireScreen } from 'enquire-js';

import {
  Nav10DataSource,
} from './MainLayout/data.source';
import { select } from 'redux-saga/effects';
const { Header, Sider, Content } = Layout;

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location } = window;
class SiderDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile,
      collapsed: false,
      show: !location.port, // 如果不是 dva 2.0 请删除
    };
  }

  componentDidMount() {
    // 适配手机屏幕;
    enquireScreen((b) => {
      this.setState({ isMobile: !!b });
    });
    // dva 2.0 样式在组件渲染之后动态加载，导致滚动组件不生效；线上不影响；
    /* 如果不是 dva 2.0 请删除 start */
    if (location.port) {
      // 样式 build 时间在 200-300ms 之间;
      setTimeout(() => {
        this.setState({
          show: true,
        });
      }, 500);
    }
    /* 如果不是 dva 2.0 请删除 end */
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  renderMenuItem (items) {
    return items.map((item) => (
      item.children?
        (<Menu.SubMenu key={item.key} title={(<div>
              <Icon type={item.icon} />
              <span>{item.title}</span></div>)
            }>
          {this.renderMenuItem(item.children)}
        </Menu.SubMenu>
        ):
        <Menu.Item key={item.key} onClick={()=> router.push(item.target) }>
          <Icon type={item.icon} />
          <span>{item.title}</span>
        </Menu.Item>
    )
    )
  }
  render() {
    return (
      <div
      className="templates-wrapper"
      ref={(d) => {
        this.dom = d;
      }}
    >
        <Nav1
        id="Nav1_0"
        key="Nav1_0"
        dataSource={Nav10DataSource}
        isMobile={this.state.isMobile}
        />
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.select_id]}>
              {this.renderMenuItem(this.props.menu_config)}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{display:"flex", margin: '24px 16px', padding: 24, background: '#fff', minHeight: 500 }}>
              {this.props.children }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const sider_type = state.routing.location.pathname;
  let select_id = '0';
  if (sider_type.startsWith('/setting/')) {
    select_id = state.setting.select_id;
  } else if (sider_type.startsWith('/admin/')){
    select_id = state.admin.select_id;
  } else if (sider_type.startsWith('/message')) {
    select_id = state.message.select_id;
  }
  return {
    select_id: select_id
  };
}
export default connect(mapStateToProps)(SiderDemo);
