import React from 'react'
import Navbar from '../../components/Navbar'
// import styles from './Dashboard.module.css' 
import { Menu, Modal, Message } from '@arco-design/web-react';
import { IconDelete, IconLock, IconEdit, IconUser } from '@arco-design/web-react/icon';
import Jobs from '../../components/Dashboard/Jobs';
// import EditProfile from '../../components/Dashboard/EditProfile';
// import ChangePassword from '../../components/Dashboard/ChangePassword';
// import DeleteAccount from '../../components/Dashboard/DeleteAccount';
// import { useUpdateAvatarMutation } from '../../redux/services/settings';
import { useUserInfo } from '../../customHooks/user';
import { useGetRecruiterDetailsQuery } from '../../redux/services/recruiter';
import CreateCompanyModal from '../../components/Dashboard/CreateCompanyModal';

const MenuItem = Menu.Item;

const Dashboard = () => {

    const [noCompany, setNoCompany] = React.useState(false);
    const [createCompany, setCreateCompany] = React.useState(false);
    const [menu, setMenu] = React.useState(1);

    const user = useUserInfo();

    const recruiterDetailsReq = useGetRecruiterDetailsQuery(user.id);

    React.useEffect(() => {
        if(recruiterDetailsReq.isSuccess && !recruiterDetailsReq.data.recruiter.company_id){
            console.log(recruiterDetailsReq.data.recruiter.company_id);
            setNoCompany(true);
        }
    }, [menu])


    // const [updateAvatar] = useUpdateAvatarMutation();

    const menuRef = React.useRef();

    const handleUploader = (e) => {
        const body = new FormData();
        body.append('user_image', e.target.files[0]);
        // updateAvatar(body).unwrap().then(() => {
        //     Message.success('Avatar changed successfully.')
        // }).catch(() => {
        //     Message.error('Something went wrong.')
        // });
    }
 
    return (
        <div>
            <Navbar/>
            <CreateCompanyModal visible={createCompany} setVisible={setCreateCompany} refetch={recruiterDetailsReq.refetch}/>
            <Modal
                title='Attention'
                visible={noCompany}
                okText='Create a new company'
                cancelText='Close'
                simple
                onOk={() => {setNoCompany(false); setCreateCompany(true);}}
                onCancel={() => setNoCompany(false)}
                >
                <p>It seems like you’re not part of a company. Either create a new one or ask your administrator to send you an invite link.</p>
            </Modal>
            <div
                className='menu-demo'
                style={{
                    height: 'calc(100vh - 76px)',
                    display: 'flex'
                }}
            >
                <Menu
                    ref={menuRef}
                    style={{ width: '225px', height: '100%', paddingTop: "75px"}}
                    hasCollapseButton
                    defaultOpenKeys={['1']}
                    defaultSelectedKeys={['1']}
                    onClickMenuItem={(item) => {setMenu(Number(item))}}
                    >
                    {/* <MenuItem key='1'>
                        <IconUser />
                        Overview
                    </MenuItem> */}
                    <MenuItem key='1'>
                        <IconEdit />
                        Company
                    </MenuItem>
                    <MenuItem key='2'>
                        <IconLock />
                        Jobs
                    </MenuItem>
                    <MenuItem key='3'>
                        <IconDelete />
                        Applicants
                    </MenuItem>
                    <MenuItem key='4'>
                        <IconDelete />
                        Settings
                    </MenuItem>
                </Menu>
                {/* {menu === 1 && <AccountOverview setMenu={setMenu} menuRef={menuRef}/>} */}
                {recruiterDetailsReq.isSuccess && recruiterDetailsReq.data.recruiter.company_id && menu === 2 && <Jobs recruiterInfo={recruiterDetailsReq}/>}
                {/* {menu === 2 && <EditProfile/>}
                {menu === 3 && <ChangePassword/>}
                {menu === 4 && <DeleteAccount/>} */}
            </div>
        </div>
    )
}

export default Dashboard