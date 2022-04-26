import React from 'react'
import styles from './Navbar.module.css'
import { Button, Avatar, Menu, Dropdown } from '@arco-design/web-react';
import { IconDown } from '@arco-design/web-react/icon';
import { Link, useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../customHooks/user';
import { useGetSignoutMutation } from '../../redux/services/auth';
import { useDispatch } from 'react-redux';
import { removeUserInfo } from '../../redux/reducers/auth';
import { MdLogout, MdSettings } from "react-icons/md";

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signout] = useGetSignoutMutation();

    const user = useUserInfo();
    // const user = true;

    const handleSignout = () => {
        signout().unwrap().then(() => {
            navigate('/');
            dispatch(removeUserInfo());
        });
    }

    const dropList = (
        <Menu>
          <Menu.Item key='1'>
              <div className={styles.menuOption}>
                <MdLogout style={{marginRight: "10px"}}/> TEST
              </div></Menu.Item>
          <Menu.Item key='2' onClick={() => navigate('/settings')}>
              <div className={styles.menuOption}>
                <MdSettings style={{marginRight: "10px"}}/> Settings
              </div></Menu.Item>
          <Menu.Item key='3' onClick={handleSignout}>
              <div className={styles.menuOption}>
                <MdLogout style={{marginRight: "10px"}}/> Sign Out
              </div>
              </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.body}>
            {user ? (<>
                <div style={{
                        marginLeft: '25px'
                    }} onClick={() => navigate('/')}>
                    logo
                </div>
                <div className={styles.dropdown}>
                    <Dropdown droplist={dropList} position='bl' trigger='click'>
                        <div className={styles.avatar}>
                            <Avatar style={{
                                marginRight: '10px'
                            }}>
                                <img alt='avatar' src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp' />
                            </Avatar> <IconDown  />
                        </div>
                    </Dropdown>
                </div>
            </>) : (<>
                <div style={{
                        marginLeft: '25px'
                    }}>
                    logo
                </div>
                <div>
                    <Link to="/signin">
                        <Button size='large' type='outline' style={{
                            marginRight: '25px'
                        }}>
                            Sign In
                        </Button>
                    </Link>
                    
                    <Link to="/signup">
                        <Button size='large' type='primary' style={{
                            marginRight: '50px'
                        }}>
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </>)}
            

        </div>
  )
}

export default Navbar