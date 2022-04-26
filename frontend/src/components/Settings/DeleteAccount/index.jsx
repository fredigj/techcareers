import React from 'react'
import styles from './DeleteAccount.module.css'
import { Modal, Button, Form, Input, Select, Message } from '@arco-design/web-react';
import { MdLock } from "react-icons/md";
import { useDeleteAccountMutation } from '../../../redux/services/settings';

const FormItem = Form.Item;

const DeleteAccount = () => {

  const [deleteAccount, deleteAccountReq] = useDeleteAccountMutation();

  const [visible, setVisible] = React.useState(false);
  const [form] = Form.useForm();

  function onOk() {
    form.validate().then((res) => {
      const body = {};
      deleteAccount(body).then(() => {
        Message.success('Account deleted successfully!');
        setVisible(false);
      });
    });
  }

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <div className={styles.body}>
    <div className={styles.form}>
      <p className={styles.title}>
        Delete Account
      </p>
      <div style={{margin: '25px 0 50px 0'}}>
        <p>When you delete your TechCareers account, you won't be able to retrieve the content or information you've shared. Your applications will also be deleted.</p>
      </div>
      <Button size='large' type='primary' status='danger' style={{
            width: '30%',
            marginBottom: '25px'
        }}  onClick={() => {setVisible(true)}}>
          Delete my account
      </Button>
    </div>
    <Modal
        title='Confirm your action'
        visible={visible}
        onOk={onOk}
        confirmLoading={deleteAccountReq.isLoading}
        onCancel={() => setVisible(false)}
        okButtonProps={{ status: 'danger' }}
      >
        <Form
          {...formItemLayout}
          form={form}
          labelCol={{ style: { flexBasis: 90 } }}
          wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
          layout="vertical"
        >
          <p>Enter your password to confirm the deletion of your account.</p>
          <FormItem field='password' rules={[{ required: true, message: "Password is required" }]}>
            <Input.Password
                required
                size='large'
                style={{marginTop: 10}}
                // placeholder='Email icon'
                prefix={<MdLock />}
                placeholder='Enter your password'
              />
          </FormItem>
        </Form>
      </Modal>
  </div>
  )
}

export default DeleteAccount