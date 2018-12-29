import React from 'react';
import { connect } from 'dva';
import { Tabs, Icon, Badge, Popover, List } from 'antd';
import router from 'umi/router';

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class NotificationMenu extends React.Component{
  notificationItemFactory = (item) => {
    if (item.verb == "APPLICATION-CONFIRM") {
      return (
      <div>
        用户{item.actor}申请成为认证用户 <a href="javascript:;" onClick={() => this.props.dispatch({
            type: 'notifications/audit',
            payload: {
              "identifier": "confirm",
              "username": item.actor,
              "is_approve": true,
            }
          })}>同意</a>
      </div>);
    }
  }
  render() {
    const props = this.props;
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="通知" key="1">
          <List 
          dataSource={props.notification_list}
          renderItem={item => (<List.Item>{this.notificationItemFactory(item)}</List.Item>)}
          />
        </TabPane>
        <TabPane tab="站内信" key="2">Content of Tab Pane 2</TabPane>
        {/* <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane> */}
      </Tabs>
    );
  }
}
// function Notification(props) {
//   return (
//       <Popover placement="topRight" content={<NotificationMenu dispatch = {props.dispatch } notification_list={props.notification_list} />} trigger="click">
//         <Badge count={0} overflowCount={100} onClick={() => props.dispatch({
//           type: 'notifications/get'
//         })}>
//           <Icon type="notification" />
//         </Badge>
//       </Popover>
//   );
// }

function Notification(props) {
  return (
    <div onClick={() => router.push('/message')}>
      <Icon type="notification" />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    notification_list: state.notifications.data
  }
}
export default connect(mapStateToProps)(Notification); 