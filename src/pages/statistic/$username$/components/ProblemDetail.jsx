import React from 'react';
import { Tabs, Table, Tag, Progress, Card } from 'antd';
import { connect } from 'dva';
import styles from './styles.css';

// import { StickyContainer, Sticky } from 'react-sticky';

const TabPane = Tabs.TabPane;

class ProblemDetail extends React.Component {
    // renderTabBar = (DefaultTabBar) => (
    //     <Sticky bottomOffset={80}>
    //       {({ style }) => (
    //         <DefaultTabBar {...this.props} style={{ ...style, zIndex: 1, background: '#fff' }} />
    //       )}
    //     </Sticky>
    // );
    
    colmuns = [{
        title: '章节',
        dataIndex: 'chap',
        className: styles.chap_column,
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: '完成百分比',
        className: styles.percent_column,
        dataIndex: 'percent',
        render: (value, row, index) => {
            let percent = row["solve_problem"].length / row["problem"].length * 100;
            return (
                <Progress percent={percent.toFixed(2)} status="active" />
            );
        }
      }, {
        title: '题目列表',
        dataIndex: 'solve_problem',
        render: (value, row, index) => {
            return (
                <div> {row["solve_problem"].map((item, index) => (
                    //    row["solve_problem"].includes(item)?
                    //   <Tag color="green">{item}</Tag>
                    //   :
                      <Tag color="magenta">{item}</Tag>
                      
                ))}</div>
            );
        }
      }]

      //colmuns[0] colmuns[1]  colmuns[2]
    render() {
        return (
             <Card>
                <Tabs defaultActiveKey="1" /*renderTabBar={this.renderTabBar}*/>
                {
                    this.props.oj_list.map((item, index) => (
                        <TabPane tab={item.title} key={index}>
                            <Table
                                dataSource={this.props.data[item.key]}
                                columns={this.colmuns}
                            />
                        </TabPane>
                    ))
                }
                </Tabs>
             </Card>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.statistic.detail,
        oj_list: state.statistic.oj_list
    };
}
export default connect(mapStateToProps)(ProblemDetail);