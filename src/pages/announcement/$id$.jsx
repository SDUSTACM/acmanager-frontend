import React from 'react';
import { Card, List, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import ReactQuill from 'react-quill'; // ES6


class AnnouncementDetail extends React.Component {
   componentDidMount() {
    const { id } = this.props.match.params;

    this.props.dispatch({
      type: 'announcement/get_announcement',
      payload: { id },
    })
  }
  edit = () => {

  }
  handleChange = () => {

  }
  render() {
    return (
      <Card>
        <Card title={this.props.data.title} extra={<a href='javascript:;' onClick={this.edit}>编辑</a>}>
          <div dangerouslySetInnerHTML={ {__html: this.props.data.content}} />
        </Card>
      </Card>         
    );
  }
}
function mapStateToProps(state) {
    return {
      data: state.announcement.announcement
    };
}
// function mapDispatchToProps(dispatch) {
//   return dispatch;
// }
export default connect(mapStateToProps)(AnnouncementDetail);