import React from 'react';
import styles from './Award.module.css';
import { Button, Divider } from '@arco-design/web-react';
import { IconEdit, IconPlus } from '@arco-design/web-react/icon';
import AwardModal from '../AwardModal';

const Award = ({seekerInfo}) => {

    const [awardModal, setAwardModal] = React.useState(false);
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
            <AwardModal visible={awardModal} setVisible={setAwardModal} isEdit={isEdit} awardInfo={seekerInfo.award[editId-1]}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p className={styles.title}>Award</p>
                <div>
                    {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                    <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => {setAwardModal(true); setIsEdit(false)}}/>
                </div>
            </div>
            <div>
                {seekerInfo.award.length === 0 ? <p className={styles.empty}>No award information</p> : seekerInfo.award.map((award, index) => {
                    return (
                        <>
                            <div key={index} className={styles.awardInfo} onMouseEnter={() => handleMouseEnter(index+1)} onMouseLeave={handleMouseLeave}>
                                <div style={{display: 'flex', gap: '25px'}}>
                                    <img src={'http://localhost:8000/uploads/default_images/default_award_icon.png'} alt="no pic yet" className={styles.institutionPic} />
                                    <div style={{width: 'fit-content'}}>
                                        <p className={styles.awardTitle}>{award.title}</p>
                                        <p className={styles.institution}>{award.institution}</p>
                                        <p className={styles.date}>{award.issue_date} - {award.expiry_date === null ? 'No expiry date' : award.expiry_date}</p>                                
                                        <p className={styles.description}>{award.description}</p>
                                    </div>
                                </div>
                                    <div style={{justifySelf: 'flex-end'}}>
                                        <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === index+1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => {setAwardModal(true); setIsEdit(true)}}/>
                                    </div>
                                </div>
                            {index+1 !== seekerInfo.award.length && <Divider />}
                        </>
                    )
                })}

                    {/* <div className={styles.awardInfo}  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
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

export default Award