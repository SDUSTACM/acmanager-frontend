import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { Checkbox } from 'antd-mobile';

const FormItem = Form.Item;
class RoleCheckboxGroup extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      let state = {
        selected_confirm: false,
        selected_admin: false,
        selected_user_admin: false,
      };
      if (nextProps.value.includes('CONFIRM')) {
        state["selected_confirm"] = true;
      } 
      if (nextProps.value.includes('ADMIN')) {
        state["selected_admin"] = true;
      }
      if (nextProps.value.includes('USER-ADMIN')) {
        state["selected_user_admin"] = true;
      }
      return {
        ...(state),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);


    this.state = {
      selected_confirm: null,
      selected_admin: null,
      selected_user_admin: null,
    };
  }
  
  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    const state = {...this.state, ...changedValue}; // 一定要将changedValue写后边，之前的setState什么时间执行时未知的
    if (onChange) {
      let roles = [];
      if (state.selected_confirm) {
        roles.push("CONFIRM");
      }
      if (state.selected_admin) {
        roles.push("ADMIN");
      }
      if (state.selected_user_admin) {
        roles.push("USER-ADMIN");
      }
      onChange(roles); 
    }
  }

  render() {
    const { value, dispatch } = this.props;
    const { state } = this;
    
    const {
      selected_confirm,
      selected_admin,
      selected_user_admin
    } = this.state;
    return (
      <div>
        <Checkbox checked={selected_confirm}  onChange={(e) => 
          this.triggerChange({selected_confirm: e.target.checked})
      }  >认证用户</Checkbox>
        <Checkbox checked={selected_admin} onChange={(e) => 
          this.triggerChange({selected_admin: e.target.checked})
        
      } >管理员</Checkbox>
        <Checkbox checked={selected_user_admin} onChange={(e) => 
          this.triggerChange({selected_user_admin: e.target.checked})
        
      } >用户管理员</Checkbox>
      </div>
    );
  }
}
const CollectionCreateForm = Form.create({
    mapPropsToFields(props) {
        if (!props.data) return {};
        return {
        username: Form.createFormField({
          value: props.data.username,
        }),
        nick: Form.createFormField({
          value: props.data.nick,
        }),
        class_name: Form.createFormField({
          value: props.data.class_name,
        }),
        roles: Form.createFormField({
          value: [...props.data.roles]
        })
      };
    },
  })(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="修改用户记录"
          okText="修改"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              })(
                <Input disabled/>
              )}
            </FormItem>
            <FormItem label="昵称">
              {getFieldDecorator('nick')(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="班级">
              {getFieldDecorator('class_name')(<Input type="textarea" />)}
            </FormItem>
            <FormItem label="所属角色" className="collection-create-form_last-form-item">
              {getFieldDecorator('roles', {
                initialValue: ["CONFIRM"],
              })(
                <RoleCheckboxGroup {...this.props} />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

class CollectionsPage extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onUpdate(values);
      console.log('Received values of form: ', values);
      form.resetFields();
      this.props.onClose();
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  render() {
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>New Collection</Button> */}
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          data={this.props.data}
          visible={this.props.visible}
          onCancel={this.props.onClose}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default CollectionsPage;
