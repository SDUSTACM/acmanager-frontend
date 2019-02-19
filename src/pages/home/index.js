import React from 'react';
import { Card, List, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';


class Index extends React.Component {
    navigateToAnnouncement = (id) => {
        router.push(`/announcement/${id}`)
    }
    componentDidMount() {
        this.props.dispatch({
            type: "announcement/get_announcement_list"
        })
    }
    render() {
        return (
            <Card>
                <Card title="公告">
                    <List
                        // header={<div>Header</div>}
                        // footer={<div>Footer</div>}
                        bordered
                        dataSource={this.props.data}
                        renderItem={item => (
                            <List.Item>
                                <Row style={{width:'100%'}}>
                                    <Col span={16}><a href="javascript:;" onClick={() => this.navigateToAnnouncement(item.id)}>{item.title}</a></Col>
                                    <Col span={4}>{item.create_time}</Col>
                                    <Col span={4}>{item.user}</Col>
                                </Row>
                            </List.Item>
                        )}
                        />
                </Card>
            </Card>         
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.announcement.announcement_list
    };
}
export default connect(mapStateToProps)(Index);