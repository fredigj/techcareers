import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Signin.module.css'
import { Input, Button, Divider, Alert, Message } from '@arco-design/web-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { MdEmail, MdLock, MdClose } from "react-icons/md";
import { useLazyGetCsrfCookieQuery } from '../../../redux/services/api'
import { useLazyGetSignInWithGoogleQuery } from '../../../redux/services/auth'
import { useGetSigninMutation } from '../../../redux/services/auth'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../../../redux/reducers/auth'

const Signin = () => {

  const navigate = useNavigate();
  const googleCode = useLocation().search.split('?code=')[1];
  const [signInWithGoogle, googleUserResponse] = useLazyGetSignInWithGoogleQuery();

  const [hasErrors, setHasErrors] = React.useState(false);

  React.useEffect(() => {
    if (googleCode) {
      Message.loading({
        id: 'need_update',
        content: 'Redirecting...',
      });
      signInWithGoogle(googleCode);
    }
  }, [])

  React.useEffect(() => {
    if (googleUserResponse.isSuccess && !googleUserResponse.data.registered) {
      navigate('/signup', { state: googleUserResponse.data.user })
    } else if(googleUserResponse.isSuccess && !googleUserResponse.data.registered){
      dispatch(addUserInfo({user: googleUserResponse.data.user, token: googleUserResponse.data.token}));
      navigate('/');
    }
    
  }, [googleUserResponse])

  const dispatch = useDispatch();

  const [triggerCsrfCookie, csrfCookieData] = useLazyGetCsrfCookieQuery();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signin, signinData] = useGetSigninMutation();

  const onSignin = () => {
    triggerCsrfCookie().unwrap().then(() => {
      signin({email, password}).unwrap().then(res => {
        dispatch(addUserInfo(res));
        navigate('/');
      }).catch(() => {
        setHasErrors(true);
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
          <div className={styles.input}>
            {hasErrors && (<Alert type='error' content='Incorrect credentials. Check your email and password.' style={{marginBottom: 25}} action={<MdClose onClick={() => setHasErrors(false)} className={styles.close}/>}/>)}
            <label>Email</label>
            <Input
              required
              size='large'
              // height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdEmail />}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e)}
            />
          </div>
          <div className={styles.input}>
            <label>Password</label>
            <Input.Password
              required
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
                loading={csrfCookieData.isFetching || signinData.isLoading}
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