import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import BaseMeun from './BaseMenu';

const {Sider} = Layout;

export interface SiderMenuProps {
    collapsed?: boolean
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
    const {collapsed} = props;
    return (
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div className='logo'></div>
            <BaseMeun/>
        </Sider>
    );
}

export default SiderMenu;
