import React from 'react'
import { Radio, Button, Menu, Dropdown } from '@arco-design/web-react';
import { IconMore } from '@arco-design/web-react/icon';
import styles from './Jobs.module.css';
import { IconPlus } from '@arco-design/web-react/icon';
import JobModal from '../JobModal'

const Jobs = ({recruiterInfo}) => {
    const RadioGroup = Radio.Group;

    console.log(recruiterInfo.data)

    const [isJobModalVisible, setIsJobModalVisible] = React.useState(false);

    const dropList = (
        <Menu>
          <Menu.Item key='1'>Edit</Menu.Item>
          <Menu.Item key='2'>View</Menu.Item>
          <Menu.Item key='3'>Archive</Menu.Item>
          <Menu.Item key='4'>Delete</Menu.Item>
        </Menu>
      );

  return (
    <div className={styles.body}>
        <JobModal visible={isJobModalVisible} setVisible={setIsJobModalVisible} refetch={recruiterInfo.refetch} />
        <div className={styles.actions}>
            <RadioGroup className={styles.buttons_container}
            type='button'
            name='status'
            defaultValue='active'
            // style={{ marginRight: 20, marginBottom: 20 }}
            >
                <Radio value='active' className={styles.button}>Active</Radio>
                <Radio value='draft' className={styles.button}>Draft</Radio>
            </RadioGroup>
            
            <Button type='outline' icon={<IconPlus />} onClick={() => setIsJobModalVisible(true)} />
        </div>
        <div className={styles.jobs_container}>
        <div className={styles.job}>
                <div className={styles.info}>
                    <h2>Senior Software Engineer</h2>
                    <h5>Remote</h5>
                </div>
                {/* <Button type='primary' icon={<IconMore />} /> */}
                <Dropdown droplist={dropList} trigger='click' position='br'>
                    <Button type='secondary'>
                    <IconMore />
                    </Button>
                </Dropdown>
            </div>
            <div className={styles.job}>
                <div className={styles.info}>
                    <h2>Senior Software Engineer</h2>
                    <h5>Remote</h5>
                </div>
                {/* <Button type='primary' icon={<IconMore />} /> */}
                <Dropdown droplist={dropList} trigger='click' position='br'>
                    <Button type='secondary'>
                    <IconMore />
                    </Button>
                </Dropdown>
            </div>
            <div className={styles.job}>
                <div className={styles.info}>
                    <h2>Senior Software Engineer</h2>
                    <h5>Remote</h5>
                </div>
                {/* <Button type='primary' icon={<IconMore />} /> */}
                <Dropdown droplist={dropList} trigger='click' position='br'>
                    <Button type='secondary'>
                    <IconMore />
                    </Button>
                </Dropdown>
            </div>
            
        </div>
    </div>
  )
}

export default Jobs