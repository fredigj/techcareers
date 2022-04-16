import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Signup.module.css'
import { Input, 
  Button, 
  Divider, 
  Steps,
  Form,
  Select,
  Checkbox,
  Message,
  Progress,
  Upload,
  DatePicker,
} from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { IconPlus, IconEdit } from '@arco-design/web-react/icon';
import { useGetRegisterMutation } from '../../../redux/services/auth'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../../redux/reducers/auth'
import { useNavigate } from 'react-router-dom'

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

  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = React.useRef();
  const [signup] = useGetRegisterMutation();

  const [credentials, setCredentials] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [step, setStep] = React.useState(1);
  const [file, setFile] = React.useState();
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;

  React.useEffect(() => {
    if(state) {
      formRef.current.setFieldsValue({ email: state.email });
    }
  }, []);

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  const handleSubmit = async () => {
    if (formRef.current) {
      try {
        setLoading(true);
        await formRef.current.validate();

        console.log('credentials: ', credentials);
        
        // const body = {
        //     email: credentials.email,
        //     user_password: "123",
        //     user_password_confirmation: "123",
        //     phone_number: "0682045738",
        //     date_of_birth: "2001-04-02",
        //     gender: "M",
        //     user_image: null,
        //     is_active: 1,
        //     user_type: 1,
        //     first_name: "Gerard",
        //     last_name: "Rama"
        // }
        console.log(file);
        const body = {
          is_active: 1, ...formRef.current.getFieldsValue(), ...credentials, user_image: file
        }
        signup(body).unwrap().then(res => {
          dispatch(addUserInfo(res));
          setLoading(false);
          navigate('/');
          
        })
      } catch (_) {
        console.log(formRef.current.getFieldsError());
      }
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
          <Form
            ref={formRef}
            {...formItemLayout}
            size="large"
            initialValues={{
              slider: 20,
              'a.b[0].c': ['b'],
            }}
            onValuesChange={onValuesChange}
            scrollToFirstError
            layout="vertical"
          >
            {step === 1 && (<>
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
                field='user_password'
                rules={
                  [{ required: true, message: 'Password is required' }]}
              >
                <Input.Password placeholder='Please enter your password' />
              </FormItem>
              <FormItem
                label='Confirm Password'
                field='user_password_confirmation'
                rules={
                  [{ required: true, message: 'Password is required' },]}
              >
                <Input.Password placeholder='Please confirm your password' />
              </FormItem>
            </>)}
            {step === 2 && (<>
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
                    { label: 'Seeker', value: 0 },
                    { label: 'Recruiter', value: 1 }
                  ]}
                  allowClear
                />
              </FormItem>
              <Form.Item
                label='Upload Avatar'
                field='user_image'
                triggerPropName='fileList'
              >
                <Upload
                      action='/'
                      fileList={file ? [file] : []}
                      showUploadList={false}
                      onChange={(_, currentFile) => {
                        setFile({
                          ...currentFile,
                          url: URL.createObjectURL(currentFile.originFile),
                        })
                      }}
                      onProgress={(currentFile) => {
                        setFile(currentFile)
                      }}
                    >
                      <div className={cs}>
                        {file && file.url ? (
                          <div className='arco-upload-list-item-picture custom-upload-avatar'>
                            <img src={file.url} />
                            <div className='arco-upload-list-item-picture-mask'>
                              <IconEdit/>
                            </div>
                            {file.status === 'uploading' && file.percent < 100 && <Progress
                                percent={file.percent}
                                type='circle'
                                size='mini'
                                style={{
                                  position: 'absolute',
                                  left: '50%',
                                  top: '50%',
                                  transform: 'translateX(-50%) translateY(-50%)'
                                }}
                              />
                            }
                          </div>
                        ) : (
                          <div className='arco-upload-trigger-picture'>
                            <div className='arco-upload-trigger-picture-text'>
                              <IconPlus/>
                              <div style={{marginTop: 10, fontWeight: 600}}>Upload</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Upload>
              </Form.Item>
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
            </>)}
            <FormItem {...noLabelLayout}>
              <Button
                  onClick={() => {setStep(1)}}
                  disabled={step === 1}
              >
                Back
              </Button>
              {step === 2 && (<Button
                onClick={handleSubmit}
                type='primary'
                style={{ marginLeft: 24, marginTop: 24 }}
                loading={loading}
              >
                Submit
              </Button> )}
              {step ===  1 && (<Button
                onClick={() => {setStep(step+1); setCredentials({...formRef.current.getFieldsValue()})}}
                type='primary'
                style={{ marginLeft: 24, marginTop: 24 }}
              >
                Next
              </Button> )}

            </FormItem>

          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup