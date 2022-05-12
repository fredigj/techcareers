import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Profile.module.css'


const Profile = () => {
 
    return (
        <div>
            <Navbar/>
            <div className={styles.profile}>
                <div className={styles.cover}>
                    <img src="" alt="none yet" />
                </div>
                <div className={styles.content}>
                    <div className={styles.firstSection}>
                        <div className={styles.personalInfo}>

                        </div>
                        <div className={styles.profilePic}>
                            <img src="" alt="profile pic" />
                        </div>
                        <div className={styles.professionalSummary}>

                        </div>
                    </div>
                    <div className={styles.experience}></div>
                </div>
            </div>
        </div>
    )
}

export default Profile