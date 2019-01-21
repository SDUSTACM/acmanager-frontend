import styles from './index.css';
import React from 'react';
import { connect } from 'dva';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


//reset your password 密码修改
class RepasswordForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "setting/reset_password",
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
    if (value && value !== form.getFieldValue('new_password')) {
      callback('两次输入的密码不匹配');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['new_password1'], { force: true });
    }
    callback();
  }

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
          label="原密码"
        >
          {getFieldDecorator('old_password', {
            rules: [ {
              required: true, message: '请输入原密码',
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
        >
          {getFieldDecorator('new_password', {
            rules: [{
              required: true, message: '请输入新密码',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('new_password1', {
            rules: [{
              required: true, message: '请确认你的密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password"/>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">确认修改</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRepasswordForm = Form.create()(RepasswordForm);

function mapStateToProps(state) {
  return {
      
  };
}
export default connect(mapStateToProps)(WrappedRepasswordForm);