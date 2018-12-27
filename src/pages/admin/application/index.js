import React from 'react';
import { Table, Divider, Tag } from 'antd';
import { connect } from 'dva';
import UpdatePage from './components/UpdateModal';


class UserList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            select_data: null
        }
    }
    columns = [{
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '昵称',
        dataIndex: 'nick',
        key: 'nick',
      }, {
        title: '班级',
        dataIndex: 'class_name',
        key: 'class_name',
      } ,
      // , {
      //   title: 'Tags',
      //   key: 'tags',
      //   dataIndex: 'tags',
      //   render: tags => (
      //     <span>
      //       {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
      //     </span>
      //   ),
      // }, 
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={() => this.setState({
                visible: true,
                select_data: record
            })}>Edit</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
          </span>
        ),
      }];
    render() {
        return (
            <div>
                <Table columns={this.columns} dataSource={this.props.data} />
                <UpdatePage visible={this.state.visible}
                onClose={() => this.setState({
                    visible: false
                })}
                data={this.state.select_data}
                onUpdate={(data) => this.props.dispatch({
                    type: "users/update",
                    payload: {id: this.state.select_data.id, ...data}
                })}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.users.user_list
    };
}
export default connect(mapStateToProps)(UserList);