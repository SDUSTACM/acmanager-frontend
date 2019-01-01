import React from 'react';
import styles from './statistic.css';
import router from 'umi/router';
import { Table, Card, Tag } from 'antd';
import { connect } from 'dva';
// import UpdatePage from './components/UpdateModal';
import { Tabs } from 'antd';
import SlidingTabsDemo from './InnerTabContainer';
const TabPane = Tabs.TabPane;


class TrainingListPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            select_data: null
        }
    }
    columns = [{
        title: '用户名',
        dataIndex: 'nick',
        key: 'nick',
        render: (text, row) => (
          <a href="javascript:;" onClick={() => router.push(`/statistic/${row.username}`)}>{text}</a>
          )
      }, {
        title: '班级',
        dataIndex: 'class_name',
        key: 'class_name',
      }, {
        title: '题数',
        dataIndex: 'count',
        key: 'count',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.count - b.count,
      } 
      ];
      callback(key) {
        console.log(key);
      }
    render() {
        const data = this.props.data;
        // console.log(data);
        // console.log(list_data);
        return (
          <Card>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="题数视图" key="1">
              <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                // style={{ height: 220 }}
              >
                {this.props.oj_id_list.map((item, index) => {
                  
                  return (
                  <TabPane tab={this.props.oj_id_to_title[item]} key={index}>
                    <Table columns={this.columns} dataSource={this.props.data[item]} />
                  </TabPane>);
                })}
              </Tabs>
                {/*  */}
              </TabPane>
              <TabPane tab="平均分视图" key="2">
                <Tabs
                  defaultActiveKey="1"
                  tabPosition="left"
                  // style={{ height: 220 }}
                >
                  {this.props.oj_id_list.map((item, index) => {
                    
                    return (
                    <TabPane tab={this.props.oj_id_to_title[item]} key={index}>
                      <Table columns={this.columns} dataSource={this.props.data_score[item]} />
                    </TabPane>);
                  })}
                </Tabs>
              </TabPane>
              <TabPane tab="总分视图" key="3">
                <Tabs
                    defaultActiveKey="1"
                    tabPosition="left"
                    // style={{ height: 220 }}
                  >
                    {this.props.oj_id_list.map((item, index) => {
                      
                      return (
                      <TabPane tab={this.props.oj_id_to_title[item]} key={index}>
                        <Table columns={this.columns} dataSource={this.props.data_ave_score[item]} />
                      </TabPane>);
                    })}
                  </Tabs>
              </TabPane>
            </Tabs>
          </Card>
        );
    }
}
function mapStateToProps(state) {
  // let columns = state.statistic.solve_statistic_columns.map((item) => ({
  //   title: item.title,
  //   dataIndex: item.id,
  //   key: item.id,
  //   // render: text => <a href="javascript:;">{text}</a>,
  // }))
  let oj_id_to_title = state.statistic.oj_id_to_title;
  console.log(oj_id_to_title, state.statistic.solve_statistic_dict);
  console.log(Object.keys(oj_id_to_title));
  return {
        data: state.statistic.solve_statistic_dict,
        data_score: state.statistic.solve_statistic_score_dict,
        data_ave_score: state.statistic.solve_statistic_ave_score_dict,
        oj_id_to_title: oj_id_to_title,
        oj_id_list: Object.keys(oj_id_to_title)
        // columns: columns
    };
}
export default connect(mapStateToProps)(TrainingListPage);