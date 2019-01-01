import React from 'react';
import { Row, Col, Radio, Card, Icon, Button } from 'antd';
import { connect } from 'dva';
import style from './styles.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const mockData = [
    {
      title: '紫书（算法竞赛入门经典）',
      count: 87,
      score: 169.7307,
      average_score: 2.2630
    },
    {
      title: '紫书（算法竞赛入门经典）',
      count: 87,
      score: 169.7307,
      average_score: 2.2630
    },
    {
      title: '紫书（算法竞赛入门经典）',
      count: 87,
      score: 169.7307,
      average_score: 2.2630
    },
    {
      title: '紫书（算法竞赛入门经典）',
      count: 87,
      score: 169.7307,
      average_score: 2.2630
    },
   
  ];

class Overview extends React.Component {
  static displayName = 'Overview';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      type: "题数",
    };
  }
  get_value = (item) => {
    if (this.state.type === "题数") {
      return item.count;
    } else if (this.state.type === "总分") {
      return item.score.toFixed(2);
    } else if (this.state.type === "平均分") {
      return item.average_score.toFixed(2);
    }
  }
  render() {
    const { username } = this.props.match.params;

    return (
      <Card className="real-time-statistics">
        {/* <div className={style.controler_block}>

        </div> */}
        <Row wrap gutter="20" style={styles.items} type="flex" justify="space-between">
          <Col xxs={24} sm={12} lg={6}>
            <div className={style.controler_block} >
              <RadioGroup defaultValue="题数"  buttonStyle="solid" onChange={(e) => this.setState({
                type: e.target.value
              })} >
                <RadioButton value="题数">题数</RadioButton>
                <RadioButton value="总分">总分</RadioButton>
                <RadioButton value="平均分">平均分</RadioButton>
              </RadioGroup>
            </div>
          </Col>
          <Col xxs={2} sm={2} lg={2}>
            <div>
              <Button type="primary" onClick={() => {
                this.props.dispatch({
                  type: 'statistic/crawl_oj_data',
                  payload : {
                    username: username
                  } 
                })
              }}>
                更新&nbsp;<Icon style={{fontSize: "1.0em"}} type="sync" spin={this.props.is_crawl} />
              </Button>
            </div>
          </Col>
        </Row>
        <Row wrap gutter="20" style={styles.items} type="flex" justify="center">
        {
          this.props.summary.map((item, index) => (

          <Col xxs={24} sm={12} lg={6}>
            <div style={{ ...styles.itemBody, ...styles.green }}>
              <div style={styles.itemTitle}>
                <p style={styles.titleText}>{item.title}</p>
                <span style={styles.tag}>{this.state.type}</span>
              </div>
              <div style={styles.itemContent}>
                <h2 style={styles.itemNum}>{this.get_value(item)}</h2>
                <div style={styles.itemMeta}>
                  <p style={styles.total}>#</p>
                  <p style={styles.desc}>排名</p>
                </div>
              </div>
            </div>
          </Col>
        ))}
        </Row>
      </Card>
    );
  }
}

const styles = {

  item: {
    marginBottom: '20px',
  },
  itemBody: {
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '4px',
    color: '#fff',
    height: '158px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    clear: 'both',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  green: {
    background: '#31B48D',
  },
  lightBlue: {
    background: '#38A1F2',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
function mapStateToProps(state) {
  return {
    summary: state.statistic.summary,
    is_crawl: state.loading.effects["statistic/crawl_oj_data"] || false 
  }
}
export default connect(mapStateToProps)(Overview);