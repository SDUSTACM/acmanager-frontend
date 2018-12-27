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
        dataIndex: 'from_user',
        key: 'from_user',
      }, {
        title: '申请角色',
        dataIndex: 'object',
        key: 'object',
        render: (text) => {
            if (text === "CONFIRM") {
                return "认证用户";
            }
        }
      }, {
        title: '申请时间',
        dataIndex: 'timestramp',
        key: 'timestramp',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { status } = record;
          if (status === "AGREE") {
            return (<span>已同意</span>)
          } else if (status == "REFUSE") {
            return (<span>已拒绝</span>)
          }
          return (<span>
            <a href="javascript:;" onClick={() => {
                this.props.dispatch({
                    type: 'message/verify', 
                    payload: {
                        id: record.id,
                        status: "AGREE"
                    }
                })
            }}>同意</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={() => {
                this.props.dispatch({
                    type: 'message/verify', 
                    payload: {
                        id: record.id,
                        status: "REFUSE"
                    }
                })
            }} >拒绝</a>
          </span>)
        } 
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