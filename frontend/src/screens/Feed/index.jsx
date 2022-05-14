import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Feed.module.css'
import { Button, Input, Divider, Form } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import Experience from '../../components/Profile/Experience';
import Education from '../../components/Profile/Education';
import Award from '../../components/Profile/Award';
import Project from '../../components/Profile/Project';
import SeekerInfoModal from '../../components/Profile/SeekerInfoModal';
import { useParams } from 'react-router-dom';
import { useGetSeekerProfileQuery } from '../../redux/services/profile';
import { useUserInfo } from '../../customHooks/user';
import banner from '../../assets/profile/user_banner.png'
import profileTemplate from '../../assets/profile/profile.png'
import { useGetJobPostDetailsQuery } from '../../redux/services/feed';

const FormItem = Form.Item;

const Feed = () => {

    const id = useParams().id;

    const [jobId, setJobId] = React.useState(id);

    const form = Form.useForm();

    const user = useUserInfo();

    const {data: jobPostData, isLoading, refetch} = useGetJobPostDetailsQuery(jobId ? jobId : null);
    // console.log(seekerProfileData);
 
    return (
        !isLoading && (
        <div>
            <Navbar/>
            <div className={styles.search}>
                <div className={styles.inputContainer}>
                    <Input
                        size='large'
                        style={{ width: '45%' }}
                        prefix={<IconSearch />}
                        placeholder='Enter a keyword'
                    />
                    <Divider type='vertical' style={{margin: 0}} />
                    <Input
                        size='large'
                        style={{ width: '45%' }}
                        prefix={<IconSearch />}
                        placeholder='Enter a location'
                    />
                </div>
                <Button type='primary' icon={<IconSearch style={{fontSize: '36'}} />} className={styles.searchBtn} />
            </div>
            <div className={styles.jobContainer}>
                <div>
                    <div className={styles.filters}>
                    <Form
                        layout="vertical"
                        form={form}
                        labelCol={{ style: { flexBasis: 90 } }}
                        wrapperCol={{ style: { flexBasis: 'calc(100% - 90px)' } }}
                        >
                        <FormItem label='Degree' field='degree'>
                            <Select
                            placeholder='Select the degree'
                            allowClear
                            >
                            {options.map((option) => (
                                <Select.Option key={option} value={option}>
                                {option}
                                </Select.Option>
                            ))}
                            </Select>
                        </FormItem>
                    </Form>
                    </div>
                    <div className={styles.sort}></div>
                </div>
                <div className={styles.jobWrapper}>
                    <div className={styles.allJobs}>

                    </div>
                    <div className={styles.jobInfo}></div>
                </div>
            </div>
        </div>
        )
    )
}

export default Feed