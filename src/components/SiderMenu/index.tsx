import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import BaseMeun from './BaseMenu';
import {MenuDataItem} from '@/typings';
import logo from '../../assets/logo.svg';

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
            <div className='logo'>
                <a href='/'>
                    <img src={logo} />
                    <h1>{title}</h1>
                </a>
            </div>
            <BaseMeun menuData={menuData}/>
        </Sider>
    );
}

export default SiderMenu;
