import React from 'react';
import {Icon, Menu} from 'antd';
import {MenuDataItem} from '@/typings';

const {SubMenu} = Menu;

interface BaseMenuProps {
    menuData?: MenuDataItem[]
};

const BaseMeun: React.FC<BaseMenuProps> = (props) => {

    const {menuData = []} = props;

    const getSubMenuOrItem = (item: MenuDataItem) =>{
        if (
            Array.isArray(item.children) &&
            !item.hideChildrenInMenu &&
            item.children.some(child => child && !!child.name)
        ) {
            return (
                <SubMenu
                    key={item.key || item.path}
                    onTitleClick={item.onTitleClick}
                >
                    {getNavMenuItems(item.children)}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={item.key || item.path}>
                <Icon type='user'/>
                <span>{item.name}</span>
            </Menu.Item>
        );
    }

    const getNavMenuItems = (menuData: MenuDataItem[]) => {
        return menuData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => getSubMenuOrItem(item));
    }

    return (
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            {getNavMenuItems(menuData)}
        </Menu>
    );
};

export default BaseMeun;
