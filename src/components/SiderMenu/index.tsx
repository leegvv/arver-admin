import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import BaseMeun from './BaseMenu';
import {MenuDataItem} from '@/typings';

const {Sider} = Layout;

export interface SiderMenuProps {
    collapsed?: boolean,
    menuData?: MenuDataItem[]
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
    const {collapsed, menuData} = props;
    return (
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div className='logo'></div>
            <BaseMeun menuData={menuData}/>
        </Sider>
    );
}

export default SiderMenu;
