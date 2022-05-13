import React from 'react';
import styles from './Experience.module.css';
import { Button, Divider } from '@arco-design/web-react';
import { IconEdit, IconPlus } from '@arco-design/web-react/icon';
import ExperienceModal from '../ExperienceModal';

const Experience = ({seekerInfo}) => {

    const [experienceModal, setExperienceModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(null);

    const [showEdit, setShowEdit] = React.useState(false);
    const [editId, setEditId] = React.useState(0);

    const handleMouseEnter = (id) => {
        setShowEdit(true);
        setEditId(id);
    }
    const handleMouseLeave = () => {
        setShowEdit(false);
    }

    return (
        <div className={styles.body}>
            <ExperienceModal visible={experienceModal} setVisible={setExperienceModal} isEdit={isEdit} educationInfo={seekerInfo.experience[editId-1]}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p className={styles.title}>Experience</p>
                <div>
                    {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                    <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => {setExperienceModal(true); setIsEdit(false)}}/>
                </div>
            </div>
            <div>
                {seekerInfo.experience.length === 0 ? <p className={styles.empty}>No experience information</p> : seekerInfo.experience.map((experience, index) => {
                    return (
                        <>
                            <div key={index} className={styles.experienceInfo} onMouseEnter={() => handleMouseEnter(index+1)} onMouseLeave={handleMouseLeave}>
                                <div style={{display: 'flex', gap: '25px'}}>
                                    <img src={'http://localhost:8000/uploads/default_images/default_experience_logo3.png'} alt="no pic yet" className={styles.companyPic} />
                                    <div style={{width: 'fit-content'}}>
                                        <p className={styles.position}>{experience.title}</p>
                                        <p className={styles.company}>{experience.company} · {experience.employment_type}</p>
                                        <p className={styles.date}>{experience.start_date} - {experience.is_current === 1 ? 'Preset' : experience.end_date}</p>
                                        <p className={styles.description}>{experience.description}</p>
                                    </div>
                                </div>
                                    <div style={{justifySelf: 'flex-end'}}>
                                        <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === index+1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => {setExperienceModal(true); setIsEdit(true)}}/>
                                    </div>
                                </div>
                            {index+1 !== seekerInfo.experience.length && <Divider />}
                        </>
                    )
                })}

                    {/* <div className={styles.experienceInfo}  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                        <img src="" alt="no pic yet" className={styles.companyPic} />
                        <div style={{width: 'fit-content'}}>
                            <p className={styles.company}>Company</p>
                            <p className={styles.position}>Position</p>
                            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tempora illum minima atque aliquam sequi inventore assumenda maiores excepturi? Maiores, cumque aliquid. Porro mollitia ullam praesentium dolore, facilis et optio.</p>
                        </div>
                        <div>
                            <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 2)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/>
                        </div>
                    </div> */}
                </div>
        </div>
    )
}

export default Experience