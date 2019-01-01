import React from 'react';
import styles from './trainings.css';
import { Table, Divider, Tag, Card } from 'antd';
import { connect } from 'dva';
// import UpdatePage from './components/UpdateModal';


class TrainingListPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            select_data: null
        }
    }
    columns = [{
        title: '集训名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
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
            <Card>
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
            </Card>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.trainings.training_list
    };
}
export default connect(mapStateToProps)(TrainingListPage);