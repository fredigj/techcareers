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
    const [isEdit, setIsEdit] = React.useState(false);
    const [editId, setEditId] = React.useState(0);


    const dropdown = (index) => {
        return (
            <Menu>
              <Menu.Item key='1' onClick={() => {setIsEdit(true); setEditId(index); setIsJobModalVisible(true)}}>Edit</Menu.Item>
              <Menu.Item key='2'>View</Menu.Item>
              <Menu.Item key='3'>Archive</Menu.Item>
              <Menu.Item key='4'>Delete</Menu.Item>
            </Menu>
          );
    }

  return (
    <div className={styles.body}>
        <JobModal visible={isJobModalVisible} setVisible={setIsJobModalVisible} jobInfo={recruiterInfo.data.job_post[editId]} refetch={recruiterInfo.refetch} isEdit={isEdit} />
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
            
            <Button type='outline' icon={<IconPlus />} onClick={() => {setIsEdit(false); setIsJobModalVisible(true)}} />
        </div>
        <div className={styles.jobs_container}>
        {recruiterInfo.data.job_post.length ? recruiterInfo.data.job_post.map((job, index) => (
            <div className={styles.job} key={index}>
                <div className={styles.info}>
                    <h2>{job.headline}</h2>
                    <h5>{job.location_type}</h5>
                </div>
                {/* <Button type='primary' icon={<IconMore />} /> */}
                <Dropdown droplist={dropdown(index)} trigger='click' position='br'>
                    <Button type='secondary'>
                    <IconMore />
                    </Button>
                </Dropdown>
            </div>
        )) : "No job posts"}
        </div>
    </div>
  )
}

export default Jobs