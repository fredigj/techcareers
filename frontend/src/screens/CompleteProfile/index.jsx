import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Signup.module.css'
import {
  Steps,
  Form,
} from '@arco-design/web-react'
import { useGetRegisterMutation } from '../../redux/services/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useUserInfo } from '../../customHooks/user'

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

const CompleteProfile = () => {

  const navigate = useNavigate();
  const user = useUserInfo();
  
  // if(useUserInfo()) {
  //   navigate('/');
  // }

  const dispatch = useDispatch();

  const firstFormRef = React.useRef();
  const secondFormRef = React.useRef();
  const [signup, signupReq] = useGetRegisterMutation();

  const [credentials, setCredentials] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);

  const [step, setStep] = React.useState(1);

  const handleSubmit = async () => {
    try {
      await secondFormRef.current.validate();
    } catch (_) {
    }
  };

  return (
    <div>
      <Navbar/>
      
      <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Finish your profile
          </p>
          <div>
          <Steps labelPlacement='vertical' current={step} style={{ maxWidth: 780, margin: '25px 0' }}>
            <Step />
            <Step />
            <Step />
          </Steps>
          </div>
            {step === 1 && (<></>)}
            {step === 2 && (<></>)}
            {step === 3 && (<></>)}
        </div>
      </div>
    </div>
  )
}

export default CompleteProfile