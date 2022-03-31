import React from 'react'
import Navbar from '../../../components/Navbar'
import styles from './Signin.module.css'
import { Input, Button, Divider } from '@arco-design/web-react'
import { Link } from 'react-router-dom'
import { MdEmail, MdLock } from "react-icons/md";

const Signup = () => {
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
              height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdEmail />}
              placeholder='Enter your email'
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
              height={50}
              style={{marginTop: 10}}
              // placeholder='Email icon'
              prefix={<MdLock />}
              placeholder='Enter your password'
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
                }}>
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
                }}>
                    Sign In with Google
              </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup