import React, {CSSProperties} from 'react';
import {Layout} from 'antd';
import BaseMeun, {BaseMenuProps} from './BaseMenu';
import {MenuDataItem} from '@/typings';
import logo from '../../../assets/logo.svg';
import styles from './index.module.less';
import {SiderProps} from 'antd/es/layout/Sider';
import classNames from 'classnames';

const {Sider} = Layout;

export interface SiderMenuProps extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>{
    logo?: React.ReactNode,
    siderWidth?: number,
    collapsed?: boolean;
    menuData?: MenuDataItem[];
    title?: string,
    style?: CSSProperties
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
    const {collapsed, menuData, title} = props;
    return (
        <Sider trigger={null} collapsible={true} collapsed={collapsed}>
            <div className={styles.siderMenuLogo}>
                <a href='/'>
                    <img src={logo} alt='logo'/>
                    <h1>{title}</h1>
                </a>
            </div>
            <BaseMeun menuData={menuData}/>
        </Sider>
    );
}

export default SiderMenu;
