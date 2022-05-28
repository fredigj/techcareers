import React from 'react';
import styles from './Project.module.css';
import { Button, Divider, Modal } from '@arco-design/web-react';
import { IconEdit, IconPlus, IconDelete } from '@arco-design/web-react/icon';
import ProjectModal from '../ProjectModal';
import {useUserInfo} from '../../../customHooks/user'
import { useDeleteSeekerProjectMutation } from '../../../redux/services/profile';

const Project = ({seekerInfo, refetch}) => {
    const user = useUserInfo(); 

    const [deleteProject] = useDeleteSeekerProjectMutation();

    const [projectModal, setProjectModal] = React.useState(false);
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

    function confirmDeleteModal(id) {
        Modal.confirm({
          title: 'Confirm deletion',
          content:
            'Are you sure you want to delete this project? Once you press the delete button, the project will be deleted immediately. You can’t undo this action.',
          okButtonProps: { status: 'danger' },
          onOk: () => {
            deleteProject(id).unwrap().finally(() => {
                refetch();
            });
          },
        });
      }

    return (
        <div className={styles.body}>
            <ProjectModal visible={projectModal} setVisible={setProjectModal} isEdit={isEdit} projectInfo={seekerInfo.project[editId-1]} refetch={refetch}/>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p className={styles.title}>Project</p>
                <div>
                    {/* <Button shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === 1) ? `edit-btn-profile edit-fadein` : `edit-btn-profile`}/> */}
                    {user && user.id === seekerInfo.seeker.user_id && <Button shape='circle' type='secondary' icon={<IconPlus />} className="edit-btn-profile edit-fadein" style={{marginLeft: "10px"}} onClick={() => {setProjectModal(true); setIsEdit(false)}}/>}
                </div>
            </div>
            <div>
                {seekerInfo.project.length === 0 ? <p className={styles.empty}>No project information</p> : seekerInfo.project.map((project, index) => {
                    return (
                        <>
                            <div key={index} className={styles.projectInfo} onMouseEnter={() => handleMouseEnter(index+1)} onMouseLeave={handleMouseLeave}>
                                <div style={{display: 'flex', gap: '25px'}}>
                                    <img src={'http://localhost:8000/uploads/default_images/default_project_icon.png'} alt="no pic yet" className={styles.projectPic} />
                                    <div style={{width: 'fit-content'}}>
                                        <p className={styles.projectTitle}>{project.title}</p>
                                        <p className={styles.description}>{project.description}</p>
                                        <p className={styles.url}>{project.url}</p>
                                    </div>
                                </div>
                                    <div className={styles.actions}>
                                    {user && user.id === seekerInfo.seeker.user_id && <Button style={{width: '30px'}} shape='circle' type='secondary' icon={<IconEdit />} className={(showEdit && editId === index+1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => {setProjectModal(true); setIsEdit(true)}}/>}
                                    {user && user.id === seekerInfo.seeker.user_id && <Button style={{width: '30px', marginLeft: '10px'}} shape='circle' type='secondary' icon={<IconDelete />} className={(showEdit && editId === index+1)  ? `edit-btn-profile edit-fadein` : `edit-btn-profile`} onClick={() => confirmDeleteModal(project.id)}/>}
                                    </div>
                                </div>
                            {index+1 !== seekerInfo.project.length && <Divider />}
                        </>
                    )
                })}

                    {/* <div className={styles.projectInfo}  onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
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

export default Project