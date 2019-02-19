import React from 'react';
import { Table, Divider, Input, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
// import UpdatePage from './components/UpdateModal';
import style from './editor.less';


class UserList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            select_data: null
        }
    }
    componentDidMount() {
      this.props.dispatch({
          type: "announcement/get_announcement_list"
      })
    }

    submit = () => {
       router.push(`/admin/announcements/new`)
    }
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text, record) => <a href="javascript:;" onClick={() => router.push(`/announcement/${record.id}`)}>{text}</a>,
      }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      }, {
        title: "作者",
        dataIndex: "user",
        key: "user"
      },
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
            <a href="javascript:;"
              onClick={() => router.push(`/admin/announcements/${record.id}`)}
              >Edit</a>
            <Divider type="vertical" />
            <a 
              onClick={() => {
                this.props.dispatch({
                    type: "announcement/delete_announcement",
                    payload: {
                      id: record.id
                    }
                })
              }}
            href="javascript:;">Delete</a>
          </span>
        ),
      }];
    render() {
        return (
            <div style={{width: "100%"}}>
                <div className={style.buttonContainer}>
                    <Button type="primary" onClick={this.submit}>新建</Button>
                </div>
            <Table columns={this.columns} dataSource={this.props.data} />
                {/* <UpdatePage visible={this.state.visible}
                onClose={() => this.setState({
                    visible: false
                })}
                data={this.state.select_data}
                onUpdate={(data) => this.props.dispatch({
                    type: "users/update",
                    payload: {id: this.state.select_data.id, ...data}
                })}
                /> */}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.announcement.announcement_list
    };
}
export default connect(mapStateToProps)(UserList);