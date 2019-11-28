import React from 'react';
import {Layout} from 'antd';
import BaseMeun from './BaseMenu';
import {MenuDataItem} from '@/typings';
import logo from '../../assets/logo.svg';
import styles from './index.module.less';

const {Sider} = Layout;

export interface SiderMenuProps {
    collapsed?: boolean;
    menuData?: MenuDataItem[];
    title?: string
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
    const {collapsed, menuData, title} = props;
    return (
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div className={styles.siderMenuLogo}>
                <a href='/'>
                    <img src={logo} alt='logo'/>
                    <h1>Arver Admin</h1>
                </a>
            </div>
            <BaseMeun menuData={menuData}/>
        </Sider>
    );
}

export default SiderMenu;
