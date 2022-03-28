import React from 'react'
import styles from './Navbar.module.css'
import { Button } from '@arco-design/web-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.body}>
        <div style={{
                marginLeft: '25px'
            }}>
            logo
        </div>
        <div>
            <Link to="/signin">
                <Button size='large' type='outline' style={{
                    marginRight: '25px'
                }}>
                    Sign In
                </Button>
            </Link>
            
            <Link to="/signup">
                <Button size='large' type='primary' style={{
                    marginRight: '50px'
                }}>
                    Sign Up
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default Navbar