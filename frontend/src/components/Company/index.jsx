import React from 'react'
import styles from './Company.module.css'
import { Button } from '@arco-design/web-react';
import { IconPlus, IconEdit, IconLocation, IconEmail, IconShareAlt } from '@arco-design/web-react/icon';
import banner from '../../assets/profile/user_banner.png'
import profileTemplate from '../../assets/profile/profile.png'
// import { useUserInfo } from '../../customHooks/user';

const Company = ({companyData, recruiterData}) => {
    console.log(companyData);
    // const user = useUserInfo();
    const [isFollowing, setIsFollowing] = React.useState(false);
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
    <div className={styles.profile}>
        <div className={styles.cover}>
            <img src={banner} alt="none yet" className={styles.banner} />
        </div>
        <div className={styles.content}>
            <div className={styles.firstSection}>
                <div className={styles.personalInfo} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                    <div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <p className={styles.name}>{companyData.company.name}</p>
                            {recruiterData && recruiterData.recruiter.company_id === companyData.company.id && <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => console.log("open modal")}/>}
                        </div>
                        <p className={styles.description}>{companyData.company.short_description}</p>
                        <p className={styles.description}>{`Establishment year: ${companyData.company.establishment_year}`}</p>
                        <p className={styles.description}>{`Company size: ${companyData.company.company_size}`}</p>
                        {/* <p className={styles.description}>{companyData.company.long_description}</p> */}
                    </div>

                </div>
                <div className={styles.profilePic}>
                    <img src={companyData.company.company_image ? 'http://localhost:8000/' + companyData.company.company_image : profileTemplate } alt="profile pic"  width={200} height={200} className={styles.profilePicBorder}/>
                    <div className={styles.followers}>
                        <p>{`${companyData.company.followers_count} followers`}</p>
                        <Button type={isFollowing ? "outline" : "primary" } icon={isFollowing ? null : <IconPlus />} onClick={() => {setIsFollowing(!isFollowing)}}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>
                    </div>
                </div>
                <div className={styles.professionalSummary} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                    <div><p className={styles.headline}>Contact Information</p></div>
                    <div className={styles.location}>
                        <IconLocation /><p>{companyData.company.location}</p>
                    </div>
                    <div className={styles.location}>
                        <IconEmail /><p>{companyData.company.email}</p>
                    </div>
                    <div className={styles.location}>
                        <IconShareAlt /><p><a href={`http://${companyData.company.website_url}`} target="_blank">{companyData.company.website_url}</a></p>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <div className={styles.description_section}>
                {/* <ExperienceModal visible={experienceModal} setVisible={setExperienceModal} isEdit={isEdit} experienceInfo={seekerInfo.experience[editId-1]} refetch={refetch}/> */}
                <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start"}}>
                    <p className={styles.title}>Description</p>
                    <p className={styles.description}>{companyData.company.long_description}</p>
                    <div>
                        {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                        {recruiterData && recruiterData.recruiter.company_id === companyData.company.id && <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => console.log("Open modal")}/>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Company