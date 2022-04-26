import React from 'react'
import { useUserInfo } from '../../../customHooks/user';
import styles from './AccountOverview.module.css'
import { Button } from '@arco-design/web-react';

const AccountOverview = ({setMenu, menuRef}) => {

  const user = useUserInfo();

  return (
    <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Account Overview
          </p>
          <div style={{margin: '25px 0 50px 0'}}>
            <div className={styles.col}>
              <p className={styles.property}>First name</p>
              <p><b>{user.first_name}</b></p>
            </div>
            <div className={styles.col}>
              <p className={styles.property}>Last name</p>
              <p><b>{user.last_name}</b></p>
            </div>
            <div className={styles.col}>
              <p className={styles.property}>Email</p>
              <p><b>{user.email}</b></p>
            </div>
            <div className={styles.col}>
              <p className={styles.property}>Gender</p>
              <p><b>{user.gender}</b></p>
            </div>
            <div className={styles.col}>
              <p className={styles.property}>Date of birth</p>
              <p><b>{user.date_of_birth}</b></p>
            </div>
            <div className={styles.col}>
              <p className={styles.property}>Phone number</p>
              <p><b>{user.phone_number}</b></p>
            </div>
          </div>
          <Button size='large' type='outline' style={{
                width: '20%',
                marginBottom: '25px'
            }} onClick={() => {
              setMenu(2);
              menuRef.current.querySelectorAll('.arco-menu-item')[1].click();
            }}>
              Edit Profile
          </Button>
        </div>
      </div>
  )
}

export default AccountOverview