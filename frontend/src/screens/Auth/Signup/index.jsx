import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Signup.module.css'
import { Input, 
  Button, 
  Steps,
  Form,
  Select,
  Checkbox,
  Upload,
  DatePicker,
  Modal
} from '@arco-design/web-react'
import { useGetRegisterMutation } from '../../../redux/services/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../../redux/reducers/auth'
import Result from '../../../components/Signup/Result'
import { useUserInfo } from '../../../customHooks/user'

const Step = Steps.Step;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};
const noLabelLayout = {
  wrapperCol: {
    span: 17,
    offset: 7,
  },
};

const Signup = () => {

  const navigate = useNavigate();
  
  if(useUserInfo()) {
    navigate('/');
  }

  const { state } = useLocation();
  const dispatch = useDispatch();

  const firstFormRef = React.useRef();
  const secondFormRef = React.useRef();
  const [signup, signupReq] = useGetRegisterMutation();

  const [credentials, setCredentials] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [step, setStep] = React.useState(1);

  const autofillGoogleInfo = async () => {
    await setStep(2);
    await setCredentials({ email: state.email });
    secondFormRef.current.setFieldsValue({ first_name: state.user.given_name });
    secondFormRef.current.setFieldsValue({ last_name: state.user.family_name });
  }

  React.useEffect(() => {
    if(state) {
      autofillGoogleInfo();
    }
  }, []);


  const handleSubmit = async () => {
    try {
      await secondFormRef.current.validate();
      const body = new FormData(); 
      if(secondFormRef.current.getFieldValue('user_image')){
        body.append("user_image", secondFormRef.current.getFieldValue('user_image')[0].originFile);
      }
      if(state){
        body.append("google_id", state.id);
      }
      body.append("email", credentials.email);
      body.append("password", credentials.password);
      body.append("password_confirmation", credentials.password_confirmation);
      body.append("first_name", secondFormRef.current.getFieldValue('first_name'));
      body.append("last_name", secondFormRef.current.getFieldValue('last_name'));
      body.append("gender", secondFormRef.current.getFieldValue('gender'));
      body.append("phone_number", secondFormRef.current.getFieldValue('phone_number'));
      body.append("date_of_birth", secondFormRef.current.getFieldValue('date_of_birth'));
      body.append("user_type", secondFormRef.current.getFieldValue('user_type'));
      body.append('is_active', 1);

      signup(body).unwrap().then(res => {
        dispatch(addUserInfo(res));
        setStep(step+1);
      }).catch(() => {
        setUserInfo(secondFormRef.current.getFieldsValue());
        setStep(step+1);
      });
    } catch (_) {
    }
  };

  return (
    <div>
      <Navbar/>
      
      <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Sign Up
          </p>
          <div>
          <Steps labelPlacement='vertical' current={step} style={{ maxWidth: 780, margin: '25px 0' }}>
            <Step />
            <Step />
            <Step />
          </Steps>
          </div>
            {step === 1 && (<>
              <Form
                ref={firstFormRef}
                {...formItemLayout}
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
                <FormItem
                  label='Password'
                  field='password'
                  rules={
                    [{ required: true, message: 'Password is required' },
                      { validator: (value, callback) => {
                      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(value)) {
                        callback("Password must be at least 8 characters long, contain at least one number, one uppercase letter, one lowercase letter, and one special character.")
                      }}}
                    ]}
                >
                  <Input.Password placeholder='Please enter your password' />
                </FormItem>
                <FormItem
                  label='Confirm Password'
                  field='password_confirmation'
                  dependencies={['password']}
                  rules={
                    [{ required: true, message: 'Password confirmation is required' },
                    { validator: (value, callback) => {
                      if (!(firstFormRef.current.getFieldValue('password') === value)) {
                        callback("The two passwords that you entered do not match.");
                      }}}
                    ]}
                >
                  <Input.Password placeholder='Please confirm your password' />
                </FormItem>
                <FormItem {...noLabelLayout}>
                  <Button

                      onClick={() => {setStep(1)}}
                      disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={async () => {
                      try {
                        await firstFormRef.current.validate();
                        setCredentials(firstFormRef.current.getFieldsValue());
                        setStep(2);
                        if(userInfo){
                          secondFormRef.current.setFieldsValue(userInfo);
                        }
                      } catch (err) {
                      }}}
                    type='primary'
                    style={{ marginLeft: 24, marginTop: 24 }}
                  >
                    Next
                  </Button>
                </FormItem>
              </Form>
            </>)}
            {step === 2 && (<>
              <Form
                ref={secondFormRef}
                {...formItemLayout}
                size="large"
                initialValues={{
                  slider: 20,
                  'a.b[0].c': ['b'],
                }}
                scrollToFirstError
                layout="vertical"
              >
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
                  <FormItem label='Account Type' field='user_type' rules={[{ required: true, message: 'Gender is required' }]}>
                    <Select
                      placeholder='Please select your account type'
                      options={[
                        { label: 'Seeker', value: 1 },
                        { label: 'Recruiter', value: 2 }
                      ]}
                      allowClear
                    />
                  </FormItem>
                  {!state && (<Form.Item
                    label='Upload Avatar'
                    field='user_image'
                    triggerPropName='fileList'
                  >
                    <Upload
                      listType='picture-card'
                      autoUpload={false}
                      name='files'
                      limit={1}
                      onPreview={(file) => {
                        Modal.info({
                          title: 'Preview',
                          content: (
                            <img
                              src={file.url || URL.createObjectURL(file.originFile)}
                              style={{ maxWidth: '100%' }}
                              alt="avatar"
                            ></img>
                          ),
                        });
                      }}
                    />
                  </Form.Item>)}
                  <FormItem
                  field='readme'
                  triggerPropName='checked'
                  rules={[
                    {
                      type: 'boolean',
                      true: true,
                      message: 'You must agree to the terms and conditions',
                    },
                  ]}
                >
                  <Checkbox>I have read the terms and conditions</Checkbox>
                </FormItem>
                <FormItem {...noLabelLayout}>
                  <Button
                    onClick={async () => {
                      try{
                        await setUserInfo(secondFormRef.current.getFieldsValue());
                        await setStep(1);
                        firstFormRef.current.setFieldsValue(credentials);
                      } catch (_) {

                      }
                    }}
                    disabled={step === 1}
                  >
                  Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    type='primary'
                    style={{ marginLeft: 24, marginTop: 24 }}
                    loading={signupReq.isLoading}
                  >
                  Submit
                </Button>
              </FormItem>
              </Form>
            </>)}
            {step === 3 && (<>
              <Result setStep={setStep} signupReq={signupReq} secondFormRef={secondFormRef} userInfo={userInfo}/>
            </>)}
        </div>
      </div>
    </div>
  )
}

export default Signup