import React from 'react'
import Navbar from '../../components/Navbar'
// import styles from './Dashboard.module.css' 
import { Menu, Avatar, Message } from '@arco-design/web-react';
import { IconDelete, IconLock, IconEdit, IconUser } from '@arco-design/web-react/icon';
import Company from '../../components/Dashboard/Company';
// import EditProfile from '../../components/Dashboard/EditProfile';
// import ChangePassword from '../../components/Dashboard/ChangePassword';
// import DeleteAccount from '../../components/Dashboard/DeleteAccount';
// import { useUpdateAvatarMutation } from '../../redux/services/settings';
import { useUserInfo } from '../../customHooks/user';

const MenuItem = Menu.Item;

const Dashboard = () => {

    const user = useUserInfo();

    const [menu, setMenu] = React.useState(1);

    // const [updateAvatar] = useUpdateAvatarMutation();

    const menuRef = React.useRef();
    const uploaderRef = React.useRef();

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
                    // hasCollapseButton
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
                {menu === 1 && <Company/>}
                {/* {menu === 2 && <EditProfile/>}
                {menu === 3 && <ChangePassword/>}
                {menu === 4 && <DeleteAccount/>} */}
            </div>
        </div>
    )
}

export default Dashboard