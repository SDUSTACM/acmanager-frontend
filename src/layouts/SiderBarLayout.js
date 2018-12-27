import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import router from 'umi/router';
import Nav1 from './MainLayout/Nav1';
import { enquireScreen } from 'enquire-js';

import {
  Nav10DataSource,
} from './MainLayout/data.source';
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {this.props.menu_config.map((item, index) => (
                <Menu.Item key={index} onClick={()=> router.push(item.target) }>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Menu.Item>
              ))}
              {/* 
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item> */}
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
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              {this.props.children }
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default SiderDemo;
