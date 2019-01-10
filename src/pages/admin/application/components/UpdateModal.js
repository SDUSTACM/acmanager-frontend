import React from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;

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
