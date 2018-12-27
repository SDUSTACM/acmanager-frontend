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
        title: '申请ID',
        dataIndex: 'id',
        key: 'id',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '申请人',
        dataIndex: 'actor',
        key: 'actor',
      }, {
        title: '申请角色',
        dataIndex: 'verb',
        key: 'verb',
        render: (text) => {
            if (text === "APPLICATION-CONFIRM") {
                return "认证用户";
            }
        }
      }, {
        title: '状态',
        dataIndex: 'class_name',
        key: 'class_name',
      }, {
        title: '申请时间',
        dataIndex: 'timestamp',
        key: 'timestamp',
      },
      {
        title: '操作',
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
        data: state.message.application_message_list
    };
}
export default connect(mapStateToProps)(UserList);