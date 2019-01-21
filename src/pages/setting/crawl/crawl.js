import styles from './crawl.css';
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
//抓题管理 账号绑定 uva vj
//crawl 爬虫
/* const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}]; */

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = [];
        const { username } = this.props;
        for (let key of Object.keys(values)) {
          const [ oj_name, oj_username, oj_password ] = [key.toUpperCase(), values[key].username, values[key].password];
          if (oj_username == null || oj_username === "") continue;
          data.push({
            "oj_name": oj_name,
            "oj_username": oj_username,
            "oj_password": oj_password || null
          })
        }
        this.props.dispatch({
          type: "setting/update_oj_account",
          payload: {
            username,
            data: data
          }
        })
        console.log('convert to: ', data);
      }
    });
  }

  /* handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  } */

 /*  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  } */

 /*  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  } */

  /* handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  } */

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 8 },
        md: { span: 8, },
      },
      wrapperCol: {
        xs: { span: 6 },
        sm: { span: 16 },
        md: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 4,
          offset: 10,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              UVA账号&nbsp;
              <Tooltip title="请输入UVA ID">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('uva.username', {
            rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              UVA密码&nbsp;
              <Tooltip title="请输入UVA 密码">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('uva.password', {
            rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input placeholder="UVA密码可以不填"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Vjudge账号&nbsp;
              <Tooltip title="请输入Vjudge账号">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('vjudge.username', {
            rules: [{ required: false, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Vjudge密码&nbsp;
              <Tooltip title="请输入Vjudge密码">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('vjudge.password', {
            rules: [{ required: false, message: '请输入Vjudge密码', whitespace: true }],
          })(
            <Input placeholder="Vjudge密码可以不填"/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">更新</Button>
        </FormItem>
      </Form>
    );
  }
}



const WrappedRegistrationForm = Form.create({
  mapPropsToFields(props) {
    console.log(props);
    let data = {};
    if (props.data.length == 0) return data;
    for (let item of props.data) {
      data[`${item.oj_name.toLowerCase()}.username`] = item["oj_username"];
      data[`${item.oj_name.toLowerCase()}.password`] = item["oj_password"];
    }
    console.log(data);
    return {
      "uva.username": Form.createFormField({
        // ...props.data.username,
        value: data["uva.username"],
      }),
      "uva.password": Form.createFormField({
        // ...props.data.username,
        value: data["uva.password"],
      }),
      "vjudge.username": Form.createFormField({
        // ...props.data.username,
        value: data["vjudge.username"],
      }),
      "vjudge.password": Form.createFormField({
        // ...props.data.username,
        value: data["vjudge.password"],
      }),
    };
  }
})(RegistrationForm);

function mapStateToProps(state) {
  return {
      username: state.user.username,
      data: state.setting.oj_account_list
  };
}
export default connect(mapStateToProps)(WrappedRegistrationForm);