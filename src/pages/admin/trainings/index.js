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
      console.log(this.props)
      this.props.dispatch({
          type: "trainings/get_training_list"
      })
    }

    submit = () => {
       router.push(`/admin/announcements/new`)
    }
    columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },{
      title: '集训名',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href="javascript:;" onClick={() => router.push(`/admin/trainings/${record.id}`) }>{text}</a>,
    }, {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '创建者',
      dataIndex: 'create_user',
      key: 'create_user',
    } ,{
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
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
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.setState({
              visible: true,
              select_data: record
          })}>加入集训</a>
          <Divider type="vertical" />
          <a href="javascript:;">Delete</a>
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
      data: state.trainings.training_list
  };
}
export default connect(mapStateToProps)(UserList);