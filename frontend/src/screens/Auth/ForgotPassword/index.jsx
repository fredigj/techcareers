import React, {useState, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import styles from './ForgotPassword.module.css'
import { Input, Button } from '@arco-design/web-react'
import { MdEmail } from "react-icons/md";
import { useGetResetPasswordLinkMutation } from '../../../redux/services/auth';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../../customHooks/user';

const ForgotPassword = () => {

  const navigate = useNavigate();
  
  if(useUserInfo()) {
    navigate('/');
  }

  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [message, setMessage] = useState("");

  const [resetPassowrd] = useGetResetPasswordLinkMutation();

  const handleClick = () =>{
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)){
      setClicked(true);
      resetPassowrd({email});
    }else{
      setIsInvalid(true);
    }
  }

  const handleEnter = (e) => {
    if(e.key === "Enter"){
      handleClick();
    }
  }

  useEffect(() => {
    if(clicked){
      setMessage(`If your email is associated with an account you should receive an email with the instructions on how reset your password (${email}).`);
    }
  }, [clicked]);  

  return (
    <div>
      <Navbar/>
      <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Forgot Password
          </p>

          {!clicked ? (
            <>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '25px 0'
              }}>
                <label>Email</label>
                  <Input
                    required
                    size='large'
                    height={50}
                    style={{marginTop: 10}}
                    // placeholder='Email icon'
                    prefix={<MdEmail />}
                    onChange={(e) => {setEmail(e); setIsInvalid(false)}}
                    placeholder='Enter your email'
                    error={isInvalid}
                    onKeyPress={handleEnter}
                  />
                {isInvalid && (<p className={styles.errorMessage}>Email is invalid</p>)}
              </div>
              <div>
                  <Button long size='large' type='primary' style={{
                        margin: '25px 0'
                    }}
                    onClick={handleClick}
                  >
                        Continue
                  </Button>
              </div>
            </>
          ) : (
            <>
              <span className="message">{message}</span>
              <br />
              <span style={{
                    fontWeight: 'bold',
                    cursor: "pointer",
                    marginBottom: '25px'
                }}
                onClick={() => {setClicked(false); setEmail("")}}
              >
                <Button type='text'>
                  Go back
                </Button>
              </span>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword