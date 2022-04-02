import React, {useState, useEffect, useLayoutEffect} from 'react'
import Navbar from '../../../components/Navbar'
import styles from './LinkResetPassword.module.css'
import { Input, Button, Divider } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { MdLock } from "react-icons/md";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [matching, setMatching] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () =>{
    if(matching){
      console.log("Password match");
    }else{
      console.log("Password dont match");
    }
  }

  useEffect(() => {
    if(password != cPassword){
      setMatching(false);
    }else{
      setMatching(true);
    }
  }, [password, cPassword]);  

  return (
    <div>
      <Navbar/>
      <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Reset Password
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '25px'
          }}>
            <label>Password</label>
            <Input.Password
              size='large'
              height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdLock />}
              onChange={(e) => setPassword(e)}
              placeholder='New password'
            />
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '25px'
          }}>
            <label>Confirm Password</label>
            <Input.Password
              size='large'
              height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdLock />}
              onChange={(e) => setCPassword(e)}
              placeholder='Confirm new password'
            />
          </div>
          <div>
              <Button long size='large' type='primary' style={{
                    margin: '25px 0'
                }}
                onClick={handleClick}
              >
                    Change Password
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword