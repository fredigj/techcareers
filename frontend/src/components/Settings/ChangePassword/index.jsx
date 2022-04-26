import React from 'react'
import { Input, 
  Button,
  Form,
  Select,
  DatePicker,
  Message
} from '@arco-design/web-react'
import { useChangePasswordMutation } from '../../../redux/services/settings';
import styles from './ChangePassword.module.css'
import { useUserInfo } from '../../../customHooks/user';

const FormItem = Form.Item;

const ChangePassword = () => {

  const [changePassword, changePasswordReq] = useChangePasswordMutation();

  const formRef = React.useRef();

  const handleSubmit = async () => {
    try {
      await formRef.current.validate();
      changePassword({
        variables: {
        }
      }).unwrap().then(() => {
        Message.success('Passowrd changed successfully.');
      })
    }
    catch (_){
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <p className={styles.title}>
          Change Password
        </p>
        <Form
            ref={formRef}
            size="large"
            initialValues={{
              slider: 20,
              'a.b[0].c': ['b'],
            }}
            scrollToFirstError
            layout="vertical"
          >
                <FormItem
                  label='Current Password'
                  field='current_password'
                  rules={
                    [{ required: true, message: 'Current password is required' }]}
                >
                  <Input.Password placeholder='Please enter your current password' />
                </FormItem>
                <FormItem
                  label='Password'
                  field='password'
                  rules={
                    [{ required: true, message: 'New password is required' },
                      { validator: (value, callback) => {
                      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(value)) {
                        callback("Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.")
                      }}}
                    ]}
                >
                  <Input.Password placeholder='Please enter your new password' />
                </FormItem>
                <FormItem
                  label='Confirm Password'
                  field='password_confirmation'
                  dependencies={['password']}
                  rules={
                    [{ required: true, message: 'New password confirmation is required' },
                    { validator: (value, callback) => {
                      if (!(formRef.current.getFieldValue('password') === value)) {
                        callback("The two passwords that you entered do not match.");
                      }}}
                    ]}
                >
                  <Input.Password placeholder='Please confirm your new password' />
                </FormItem>
            <FormItem>
              <Button
                onClick={handleSubmit}
                type='primary'
                style={{ marginTop: 24 }}
                loading={changePasswordReq.isLoading}
              >
              Change Password
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword