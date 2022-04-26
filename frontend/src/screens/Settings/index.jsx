import React from 'react'
import Navbar from '../../components/Navbar'
import styles from './Settings.module.css'
import { Menu, Avatar, Message, Modal, Upload, Progress } from '@arco-design/web-react';
import { IconDelete, IconLock, IconEdit, IconUser, IconPlus } from '@arco-design/web-react/icon';
import AccountOverview from '../../components/Settings/AccountOverview';
import EditProfile from '../../components/Settings/EditProfile';
import ChangePassword from '../../components/Settings/ChangePassword';
import DeleteAccount from '../../components/Settings/DeleteAccount';
import { useUpdateAvatarMutation } from '../../redux/services/settings';

const MenuItem = Menu.Item;

const Settings = () => {

    const [menu, setMenu] = React.useState(1);

    const [updateAvatar, updateAvatarReq] = useUpdateAvatarMutation();

    const menuRef = React.useRef();
    const uploaderRef = React.useRef();

    const handleUploader = (e) => {
        const body = new FormData();
        body.append('user_image', e.target.files[0]);
        updateAvatar(body).unwrap().then(() => {
            Message.success('Avatar changed successfully.')
        }).catch(() => {
            Message.error('Something went wrong.')
        });
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
                    style={{ width: '225px', height: '100%'}}
                    // hasCollapseButton
                    defaultOpenKeys={['1']}
                    defaultSelectedKeys={['1']}
                    onClickMenuItem={(item) => {setMenu(Number(item))}}
                    >
                        <div className={styles.avatar}>
                            <Avatar triggerIcon={<IconEdit />}
                                triggerIconStyle={{ color: '#3491FA' }}
                                onClick={() => uploaderRef.current.click()}
                                size={64}
                                >
                                    <img alt='avatar' className={styles.img} src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp' />
                                    <input type="file" id="img" name="img" accept="image/*" ref={uploaderRef} style={{display: 'none'}} onChange={handleUploader}/>
                            </Avatar>
                        </div>
                    <MenuItem key='1'>
                        <IconUser />
                        Account Overview
                    </MenuItem>
                    <MenuItem key='2'>
                        <IconEdit />
                        Edit Profile
                    </MenuItem>
                    <MenuItem key='3'>
                        <IconLock />
                        Change Password
                    </MenuItem>
                    <MenuItem key='4'>
                        <IconDelete />
                        Delete Account
                    </MenuItem>
                </Menu>
                {menu === 1 && <AccountOverview setMenu={setMenu} menuRef={menuRef}/>}
                {menu === 2 && <EditProfile/>}
                {menu === 3 && <ChangePassword/>}
                {menu === 4 && <DeleteAccount/>}
            </div>
        </div>
    )
}

export default Settings