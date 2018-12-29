import React from 'react';
import styles from './home.css';
import { Card, List, Row, Col } from 'antd';
const data = [
    {
        title: 'ACManager alphav0.1发布！',
        author: "wzh",
        time: "2018-12-29"
    },
  ];
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card title="公告">
                <List
                    // header={<div>Header</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <Row style={{width:'100%'}}>
                                <Col span={16}>{item.title}</Col>
                                <Col span={4}>{item.time}</Col>
                                <Col span={4}>{item.author}</Col>
                            </Row>
                        </List.Item>
                    )}
                    />
            </Card>            
        );
    }
}
export default Index;