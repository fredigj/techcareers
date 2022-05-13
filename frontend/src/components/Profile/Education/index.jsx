import React from 'react';
import styles from './Education.module.css';
import { Button, Divider } from '@arco-design/web-react';
import { IconEdit, IconPlus } from '@arco-design/web-react/icon';
import EducationModal from '../EducationModal';

const Education = ({seekerInfo}) => {

    const [educationModal, setEducationModal] = React.useState(false);
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
            <EducationModal visible={educationModal} setVisible={setEducationModal} isEdit={isEdit} educationInfo={seekerInfo.education[editId-1]}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p className={styles.title}>Education</p>
                <div>
                    {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                    <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => {setEducationModal(true); setIsEdit(false)}}/>
                </div>
            </div>
            <div>
                {seekerInfo.education.length === 0 ? <p className={styles.empty}>No education information</p> : seekerInfo.education.map((education, index) => {
                    return (
                        <>
                            <div key={index} className={styles.educationInfo} onMouseEnter={() => handleMouseEnter(index+1)} onMouseLeave={handleMouseLeave}>
                                <div style={{display: 'flex', gap: '25px'}}>
                                    <img src={'http://localhost:8000/uploads/default_images/default_education_icon.png'} alt="no pic yet" className={styles.institutionPic} />
                                    <div style={{width: 'fit-content'}}>
                                        <p className={styles.field_of_study}>{education.field_of_study}</p>
                                        <p className={styles.institution}>{education.institution} · {education.degree}</p>
                                        <p className={styles.date}>{education.start_date} - {education.end_date}</p>
                                        <p className={styles.grade}>{education.grade}</p>
                                    </div>
                                </div>
                                    <div style={{justifySelf: 'flex-end'}}>
                                        <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === index+1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => {setEducationModal(true); setIsEdit(true)}}/>
                                    </div>
                                </div>
                            {index+1 !== seekerInfo.education.length && <Divider />}
                        </>
                    )
                })}

                    {/* <div className={styles.educationInfo}  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                        <img src="" alt="no pic yet" className={styles.institutionPic} />
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

export default Education