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

  const formRef = React.useRef();

  const [step, setStep] = React.useState(1);
  const [file, setFile] = React.useState()
  const cs = `arco-upload-list-item${file && file.status === 'error' ? ' is-error' : ''}`;

  React.useEffect(() => {
    formRef.current.setFieldsValue({ rate: 5 });
  }, []);

  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
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
                field='password'
                rules={
                  [{ required: true, message: 'Password is required' }]}
              >
                <Input.Password placeholder='Please enter your password' />
              </FormItem>
              <FormItem
                label='Confirm Password'
                field='confirm_password'
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
                field='dob'
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
                    { label: 'Male', value: 0 },
                    { label: 'Female', value: 1 },
                    { label: 'Prefer not to say', value: 2 },
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
              <FormItem label='Account Type' field='type' rules={[{ required: true, message: 'Gender is required' }]}>
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
                field='avatar'
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
                onClick={async () => {
                  if (formRef.current) {
                    try {
                      await formRef.current.validate();
                      Message.info('校验通过，提交成功！');
                    } catch (_) {
                      console.log(formRef.current.getFieldsError());
                      Message.error('校验失败，请检查字段！');
                    }
                  }
                }}
                type='primary'
                style={{ marginLeft: 24, marginTop: 24 }}
              >
                Submit
              </Button> )}
              {step ===  1 && (<Button
                onClick={() => {setStep(step+1)}}
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