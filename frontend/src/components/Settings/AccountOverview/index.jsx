import React from 'react'
import { useUserInfo } from '../../../customHooks/user';
import styles from './AccountOverview.module.css'
import { Button } from '@arco-design/web-react';

const AccountOverview = () => {

  const user = useUserInfo();
  console.log(user);

  return (
    <div className={styles.body}>
        <div className={styles.form}>
          <p className={styles.title}>
            Account Overview
          </p>
          <div style={{marginBottom: '25px'}}>
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
                width: '20%'
            }}>
              Edit Profile
          </Button>
        </div>
      </div>
  )
}

export default AccountOverview