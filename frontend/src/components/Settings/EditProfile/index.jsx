import React from 'react'
import { Input, 
  Button,
  Form,
  Select,
  DatePicker,
  Message
} from '@arco-design/web-react'
import { useEditProfileMutation } from '../../../redux/services/settings';
import styles from './EditProfile.module.css'
import { useUserInfo } from '../../../customHooks/user';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from '../../../redux/reducers/auth';

const FormItem = Form.Item;

const EditProfile = () => {

  const dispatch = useDispatch();

  const user = useUserInfo();

  React.useEffect(() => {
    formRef.current.setFieldsValue({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
      phone_number: user.phone_number,
    });
  } , []);

  const [editProfile, editProfileReq] = useEditProfileMutation();

  const formRef = React.useRef();

  const handleSubmit = async () => {
    try {
      await formRef.current.validate();
      editProfile(formRef.current.getFieldsValue()).unwrap().then(() => {
        dispatch(updateUserInfo(formRef.current.getFieldsValue()));
        Message.success('Profile updated successfully.');
      })
    }
    catch (_){
    }
  }

  return (
    <div className={styles.body}>
      <div className={styles.form}>
        <p className={styles.title}>
          Edit Profile
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
                  label='Email'
                  field='email'
                  rules={
                    [{ required: true, message: 'Email is required' },
                      { type: "email", message: 'Email is not valid' }]}
                >
                  <Input placeholder='Please enter your email' />
                </FormItem>
              <div className={styles.name}>
                <FormItem
                  label='First Name'
                  field='first_name'
                  rules={
                    [{ required: true, message: 'First name is required' }]}
                >
                  <Input placeholder='Please enter your first name' />
                </FormItem>
                <FormItem
                  label='Last Name'
                  field='last_name'
                  rules={
                    [{ required: true, message: 'Last name is required' }]}
                >
                  <Input placeholder='Please enter your last name' />
                </FormItem>
              </div>
              <FormItem
                label='Date of Birth'
                field='date_of_birth'
                rules={[
                  {
                    required: true,
                    message: 'Date of Birth is required',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%'}} />
              </FormItem>
              <FormItem label='Gender' field='gender' rules={[{ required: true, message: 'Gender is required' }]}>
                <Select
                  placeholder='Please select your gender'
                  options={[
                    { label: 'Male', value: 'M' },
                    { label: 'Female', value: 'F' },
                    { label: 'Prefer not to say', value: 'X' },
                  ]}
                  allowClear
                />
              </FormItem>
              <FormItem
                  label='Phone Number'
                  field='phone_number'
                  rules={
                    [{ required: true, message: 'Phone Number is required' }]}
                >
                  <Input placeholder='+355692297206' />
                </FormItem>
            <FormItem>
              <Button
                onClick={handleSubmit}
                type='primary'
                style={{ marginTop: 24 }}
                loading={editProfileReq.isLoading}
              >
              Save Profile
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  )
}

export default EditProfile