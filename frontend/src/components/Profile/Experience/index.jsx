import React from 'react';
import styles from './Experience.module.css';
import { Button, Divider } from '@arco-design/web-react';
import { IconEdit, IconPlus } from '@arco-design/web-react/icon';
import ExperienceModal from '../ExperienceModal';

const Experience = ({seekerInfo}) => {

    console.log(seekerInfo);

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
        setEditId(0);
    }

    return (
        <div className={styles.body}>
            <ExperienceModal visible={experienceModal} setVisible={setExperienceModal} isEdit={isEdit} educationInfo={seekerInfo}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p className={styles.title}>Experience</p>
                <div>
                    {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                    <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => {setExperienceModal(true); setIsEdit(false)}}/>
                </div>
            </div>
            <div>
                    <div className={styles.experienceInfo} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
                        <img src="" alt="no pic yet" className={styles.companyPic} />
                        <div style={{width: 'fit-content'}}>
                            <p className={styles.company}>Company</p>
                            <p className={styles.position}>Position</p>
                            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tempora illum minima atque aliquam sequi inventore assumenda maiores excepturi? Maiores, cumque aliquid. Porro mollitia ullam praesentium dolore, facilis et optio.</p>
                        </div>
                        <div>
                            <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => {setExperienceModal(true); setIsEdit(true)}}/>
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.experienceInfo}  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
                        <img src="" alt="no pic yet" className={styles.companyPic} />
                        <div style={{width: 'fit-content'}}>
                            <p className={styles.company}>Company</p>
                            <p className={styles.position}>Position</p>
                            <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel tempora illum minima atque aliquam sequi inventore assumenda maiores excepturi? Maiores, cumque aliquid. Porro mollitia ullam praesentium dolore, facilis et optio.</p>
                        </div>
                        <div>
                            <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 2)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Experience