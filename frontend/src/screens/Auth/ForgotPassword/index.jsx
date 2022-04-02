import React, {useState, useEffect, useLayoutEffect} from 'react'
import Navbar from '../../../components/Navbar'
import styles from './ForgotPassword.module.css'
import { Input, Button, Divider } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { MdEmail, MdLock } from "react-icons/md";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () =>{
    if(email){
      setClicked(true);
    }
  }

  useEffect(() => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(clicked){
      if(email.match(re)){
        setMessage(`We have sent a password reset link to yout email (${email}).`);
      }else{
        setMessage(`(${email}) is an invalid Email.`);
      }
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
                  size='large'
                  height={50}
                  style={{marginTop: 10}}
                  // placeholder='Email icon'
                  prefix={<MdEmail />}
                  onChange={(e) => setEmail(e)}
                  placeholder='Enter your email'
                />
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
                    cursor: "pointer"
                }}
                onClick={() => {setClicked(false); setEmail("")}}
              >
                Go back
              </span>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword