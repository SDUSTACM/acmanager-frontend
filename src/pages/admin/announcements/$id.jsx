import React from 'react';
import { Button, Input } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6
import style from './editor.less';

class AnnouncementDetail extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        is_load: false,
        mode: "edit",
        text: '',
        title: ''
     };
   }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === "new") {
      this.setState({
        mode: "new"
      })
    } else {
      this.props.dispatch({
        type: 'announcement/get_announcement',
        payload: { id },
      })
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.data && !state.is_load) {
      return {
        is_load: true,
        text: props.data.content,
        title: props.data.title
      }
    }
  }

  edit = () => {

  }
  handleChange = (value) => {
    this.setState({ text: value })
  }

  submit = () => {
    const { id } = this.props.match.params;
    if (this.state.mode === "new") {
      this.props.dispatch({
        type: "announcement/create_announcement",
        payload: {
          title: this.state.title, 
          content: this.state.text
        }
      })
    } else {
      this.props.dispatch({
        type: "announcement/update_announcement",
        payload: {
          id,
          title: this.state.title, 
          content: this.state.text
        }
      })
    }
  }
  // display: flex;
  // flex-direction: column;
  render() {
    return (
      <div className={style.rootContainer}>
        <div className={style.container}>
          <Input className={style.titleInput} placeholder="标题" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
          <Button type="primary" onClick={this.submit}>保存</Button>
        </div>
        <ReactQuill 
            className="app"
            theme="snow"
            modules={AnnouncementDetail.modules}
            // formats={AnnouncementDetail.formats}
            value={this.state.text}
            placeholder="在此输入"
            onChange={this.handleChange} />
      </div>
    );
  }
}
AnnouncementDetail.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
AnnouncementDetail.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/* 
 * PropType validation
 */


function mapStateToProps(state) {
    return {
      data: state.announcement.announcement
    };
}
// function mapDispatchToProps(dispatch) {
//   return dispatch;
// }
export default connect(mapStateToProps)(AnnouncementDetail);