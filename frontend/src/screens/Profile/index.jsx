import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Profile.module.css'
import { Button } from '@arco-design/web-react';
import { IconEdit, IconLocation } from '@arco-design/web-react/icon';
import Experience from '../../components/Profile/Experience';
import Education from '../../components/Profile/Education';
import Award from '../../components/Profile/Award';
import Project from '../../components/Profile/Project';
import SeekerInfoModal from '../../components/Profile/SeekerInfoModal';
import { useParams } from 'react-router-dom';
import { useGetSeekerProfileQuery } from '../../redux/services/profile';
import { useUserInfo } from '../../customHooks/user';

const Profile = () => {

    const id = useParams().id;

    const user = useUserInfo();

    const {data: seekerProfileData, isLoading, refetch} = useGetSeekerProfileQuery(id);
    // console.log(seekerProfileData);

    const [seekerInfoModal, setSeekerInfoModal] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(false);
    const [editId, setEditId] = React.useState(0);

    const handleMouseEnter = (id) => {
        setShowEdit(true);
        setEditId(id);
    }
    const handleMouseLeave = () => {
        setShowEdit(false);
        setEditId(0);
    }
 
    return (
        !isLoading && (
        <div>
            <Navbar/>
            <SeekerInfoModal visible={seekerInfoModal} setVisible={setSeekerInfoModal} seekerInfo={seekerProfileData.seeker} refetch={refetch}s/>
            <div className={styles.profile}>
                <div className={styles.cover}>
                    <img src="" alt="none yet" />
                </div>
                <div className={styles.content}>
                    <div className={styles.firstSection}>
                        <div className={styles.personalInfo} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                            <div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p className={styles.name}>{`${seekerProfileData.user.first_name} ${seekerProfileData.user.last_name}`}</p>
                                    {user.id === seekerProfileData.seeker.user_id && <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => setSeekerInfoModal(true)}/>}
                                </div>
                                <p className={styles.headline}>{seekerProfileData.seeker.headline}</p>
                                <p className={styles.description}>{seekerProfileData.seeker.description}</p>
                                <div className={styles.location}>
                                    <IconLocation /><p>{seekerProfileData.seeker.location}</p>
                                </div>
                            </div>

                        </div>
                        <div className={styles.profilePic}>
                            <img src={'http://localhost:8000/' + seekerProfileData.user.user_image} alt="profile pic"  width={200} height={200} className={styles.profilePicBorder}/>
                        </div>
                        <div className={styles.professionalSummary} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                            <div><p className={styles.headline}>Account Overview</p></div>
                            <div>
                                <div className={styles.summary}><img src="" alt="no pic yet" className={styles.summaryPic}/><p>testtttttt</p></div>
                                <div className={styles.summary}><img src="" alt="no pic yet" className={styles.summaryPic}/><p>testtttttt2222</p></div>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <Experience seekerInfo={seekerProfileData} refetch={refetch}/>
                    <div className={styles.experience}></div>
                    <Education seekerInfo={seekerProfileData} refetch={refetch}/>
                    <div className={styles.education}></div>
                    <Award seekerInfo={seekerProfileData} refetch={refetch}/>
                    <div className={styles.award}></div>
                    <Project seekerInfo={seekerProfileData} refetch={refetch}/>
                    <div className={styles.project}></div>
                </div>
            </div>
        </div>
        )
    )
}

export default Profile