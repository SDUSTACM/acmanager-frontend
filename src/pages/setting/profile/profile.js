import styles from './profile.css';
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
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
}];
class ConfirmInput extends React.Component {
  // static getDerivedStateFromProps(nextProps) {
  //   // Should be a controlled component.
  //   if ('value' in nextProps) {
  //     return {
  //       ...(nextProps.value || {}),
  //     };
  //   }
  //   return null;
  // }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      // number: value.number || 0,
      // currency: value.currency || 'rmb',
    };
  }
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { value, dispatch } = this.props;
    console.log(value);
    const state = this.state;
    const ConfirmApplication = (
      <span>未认证,
      <a href="javascript:;" onClick={() => dispatch({
        type: "application/confirm"
      })}>申请成为认证用户</a>
      </span>
    )
    return (
      <span>
        <span>{value? "已认证": ConfirmApplication}</span>
      </span>
    );
  }
}
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "setting/update_profile",
          payload: {
            ...values
          }
        })
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 8,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('username', {
            rules: [ {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input disabled />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              状态&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('is_confirm', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <ConfirmInput dispatch={this.props.dispatch}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              姓名&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('nick', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              班级&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('class_name', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(
            <Input />
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
    if (!props.data) return {};
    return {
      username: Form.createFormField({
        // ...props.data.username,
        value: props.data.username,
      }),
      nick: Form.createFormField({
        // ...props.data.username,
        value: props.data.nick,
      }),
      class_name: Form.createFormField({
        // ...props.data.username,
        value: props.data.class_name,
      }),
      is_confirm: Form.createFormField({
        // ...props.data.username,
        value: props.data.is_confirm,
      }),
    };
  }
})(RegistrationForm);

function mapStateToProps(state) {
  return {
      data: state.setting.profile
  };
}
export default connect(mapStateToProps)(WrappedRegistrationForm);