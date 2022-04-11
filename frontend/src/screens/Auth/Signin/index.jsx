import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Signin.module.css'
import { Input, Button, Divider } from '@arco-design/web-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MdEmail, MdLock } from "react-icons/md";
import { useLazyGetCsrfCookieQuery } from '../../../redux/services/api'
import { useLazyGetSignInWithGoogleQuery } from '../../../redux/services/auth'
import { useGetSigninMutation } from '../../../redux/services/auth'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../../redux/reducers/auth'

const Signin = () => {

  const navigate = useNavigate();
  const googleCode = useLocation().search.split('?code=')[1];
  const [signInWithGoogle, googleUserResponse] = useLazyGetSignInWithGoogleQuery();

  React.useEffect(() => {
    if (googleCode) {
      signInWithGoogle(googleCode);
    }
  }, [])

  React.useEffect(() => {
    if (googleUserResponse.isSuccess) {
      navigate('/signup', { state: googleUserResponse.data.user })
    }
    
  }, [googleUserResponse])

  const dispatch = useDispatch();

  const [triggerCsrfCookie] = useLazyGetCsrfCookieQuery();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signin] = useGetSigninMutation();

  const onSignin = () => {
    triggerCsrfCookie().unwrap().then(() => {
      signin({email, user_password: password}).unwrap().then(res => {
        dispatch(addUserInfo(res));
        navigate('/');
      });
    })
  }

  const onSignInWithGoogle = async () => {
    fetch('http://localhost:8000/api/auth/google')
    .then(res => res.json())
    .then(res => {
      window.open(res.url, '_self');
    })
  }


  return (
    <div>
      <Navbar/>
      <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Sign In
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '25px'
          }}>
            <label>Email</label>
            <Input
              size='large'
              // height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdEmail />}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e)}
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '25px'
          }}>
            <label>Password</label>
            <Input.Password
              size='large'
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdLock />}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e)}
            />
          </div>
          <div style={{
            width: 'fit-content',
            marginLeft: 'auto'
          }}>
            <Link to="/forgot-password">
              <p className={styles.link}>Forgot your password?</p>
            </Link>
          </div>
          <div>
              <Button long size='large' type='primary' style={{
                    margin: '25px 0'
                }} onClick={onSignin}
                >
                    Sign In
              </Button>
              <Divider style={{
                width: '20%',
                margin: '20px auto',
                minWidth: '20%',
                maxWidth: '20%'
              }} />
              <Button long size='large' type='outline' style={{
                    margin: '25px 0'
                }} onClick={onSignInWithGoogle}
                >
                    Sign In with Google
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin