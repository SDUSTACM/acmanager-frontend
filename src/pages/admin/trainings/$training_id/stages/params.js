import React from 'react';
import router from 'umi/router';
import { Steps, Table, Divider } from 'antd';
import { connect } from 'dva';
const Step = Steps.Step;

class StageAdminPage extends React.Component {
  stages = [
    {
      name: "阶段1",
      description: "这是阶段1"
    },
    {
      name: "阶段2",
      description: "这是阶段2"
    },
    {
      name: "阶段3",
      description: "这是阶段3"
    },

  ]
  columns = [{
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },{
    title: '阶段名',
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
        })}>加入阶段</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  }];
  componentDidMount() {
    console.log(this.props);
    const { training_id } = this.props.match.params;
    this.props.dispatch({
        type: "trainings/get_training_stage_list",
        payload: { training_id }
    })
  }
  render () {
    return (
    <div style={{width: "100%"}}>
      <Steps direction="vertical" current={0}>
        {this.stages.map(item => (
          <Step title={item.name} description={item.description} />
        ))}
      </Steps>
      <Table columns={this.columns} dataSource={this.props.data}>
      </Table>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    data: state.trainings.training_stage_list
  }
}
export default connect(mapStateToProps)(StageAdminPage);