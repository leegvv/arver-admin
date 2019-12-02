import React from 'react';
import {Icon, Menu} from 'antd';
import {MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse} from '@/typings';
import {MenuMode, MenuProps} from 'antd/es/menu';
import {Settings} from '../defaultSettings';
import {MenuTheme} from 'antd/es/menu/MenuContext';

const {SubMenu} = Menu;

export interface BaseMenuProps extends Partial<RouterTypes<Route>>, Omit<MenuProps, 'openKeys'>, Partial<Settings>{
    className?: string;
    collapsed?: boolean;
    flatMenuKeys?: string[];
    handleOpenChange?: (openKeys: string[]) => void;
    isMobile?: boolean;
    menuData?: MenuDataItem[];
    mode?: MenuMode;
    onCollapse?: (collapsed: boolean) => void;
    onOpenChange?: (openKeys: string[]) => void;
    openKeys?: WithFalse<String[]>;
    style?: React.CSSProperties;
    theme?: MenuTheme;
    formatMessage?: (message: MessageDescriptor) => string;
    subMenuItemRender?: WithFalse<(item: MenuDataItem & {isUrl: boolean}, defaultDom: React.ReactNode) => React.ReactNode>;
    menuItemRender?: WithFalse<(item: MenuDataItem & {isUrl: boolean}, defaultDom: React.ReactNode) => React.ReactNode>;
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
                    title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {getNavMenuItems(item.children)}
                </SubMenu>
            );
        }
        return (
            <Menu.Item key={item.key || item.path}>
                <Icon type={item.icon}/>
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
