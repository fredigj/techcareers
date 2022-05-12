import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Profile.module.css'
import { Button } from '@arco-design/web-react';
import { IconEdit, IconLocation } from '@arco-design/web-react/icon';
import Experience from '../../components/Profile/Experience';
import SeekerInfoModal from '../../components/Profile/SeekerInfoModal';
import { useParams } from 'react-router-dom';
import { useGetSeekerProfileQuery } from '../../redux/services/profile';

const Profile = () => {

    const id = useParams().id;

    const {data: seekerProfileData, isLoading} = useGetSeekerProfileQuery(id);
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
            <SeekerInfoModal visible={seekerInfoModal} setVisible={setSeekerInfoModal} seekerInfo={seekerProfileData.seeker[0]}/>
            <div className={styles.profile}>
                <div className={styles.cover}>
                    <img src="" alt="none yet" />
                </div>
                <div className={styles.content}>
                    <div className={styles.firstSection}>
                        <div className={styles.personalInfo} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                            <div>
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <p className={styles.name}>{`${seekerProfileData.user[0].first_name} ${seekerProfileData.user[0].last_name}`}</p>
                                    <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => setSeekerInfoModal(true)}/>
                                </div>
                                <p className={styles.headline}>{seekerProfileData.seeker[0].headline}</p>
                                <p className={styles.description}>{seekerProfileData.seeker[0].description}</p>
                                <div className={styles.location}>
                                    <IconLocation /><p>{seekerProfileData.seeker[0].location}</p>
                                </div>
                            </div>

                        </div>
                        <div className={styles.profilePic}>
                            <img src="" alt="profile pic" />
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
                    <Experience seekerInfo={seekerProfileData}/>
                    <div className={styles.experience}></div>
                </div>
            </div>
        </div>
        )
    )
}

export default Profile