import React, {useState, useEffect, useLayoutEffect} from 'react'
import Navbar from '../../../components/Navbar'
import styles from './LinkResetPassword.module.css'
import { Input, Button } from '@arco-design/web-react'
import { useParams } from 'react-router-dom';
import { MdLock } from "react-icons/md";
import { useSetNewPasswordMutation } from '../../../redux/services/auth'

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [cpasswordMessage, setCPasswordMessage] = useState("");
  const { token } = useParams();

  const [setNewPassword] = useSetNewPasswordMutation();

  const handleClick = () =>{
    const body = {
      password, password_confirmation: cPassword, token
    }
    setNewPassword(body);
  }
  const handlePasswordChange = (e) =>{
    setPassword(e);
    if(e.length === 0){
      setIsPasswordInvalid(true);
      setPasswordMessage("Password is required");
    }else if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/.test(e)){
      setIsPasswordInvalid(false);
    }else{
      setIsPasswordInvalid(true);
      setPasswordMessage("Password must be at least 8 characters long, contain at least one number, one lowercase and uppercase letter and one special character");
    }
  }
  const handleCPasswordChange = (e) =>{
    setCPassword(e);
    if(e !== password){
      setDoPasswordsMatch(true);
      setCPasswordMessage("Passwords do not match");
    }else{
      setDoPasswordsMatch(false);
    }
  }

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
              error={isPasswordInvalid}
              prefix={<MdLock />}
              onChange={(e) => handlePasswordChange(e)}
              placeholder='New password'
            />
            {isPasswordInvalid && (<p className={styles.errorMessage}>{passwordMessage}</p>)}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '25px 0'
          }}>
            <label>Confirm Password</label>
            <Input.Password
              size='large'
              height={50}
              style={{marginTop: 10}}
              error={doPasswordsMatch}
              // placeholder='Email icon'
              prefix={<MdLock />}
              onChange={(e) => handleCPasswordChange(e)}
              placeholder='Confirm new password'
            />
            {doPasswordsMatch && (<p className={styles.errorMessage}>{cpasswordMessage}</p>)}
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