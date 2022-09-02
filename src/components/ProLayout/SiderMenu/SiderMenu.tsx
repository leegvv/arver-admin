import React, {CSSProperties} from 'react';
import {Layout} from 'antd';
import BaseMeun, {BaseMenuProps} from './BaseMenu';
import {MenuDataItem, WithFalse} from '@/typings';
import logo from '../../../assets/logo.svg';
import styles from './index.module.less';

const {Sider} = Layout;

export interface SiderMenuProps extends Pick<BaseMenuProps, Exclude<keyof BaseMenuProps, ['onCollapse']>>{
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
    siderWidth?: number,
    collapsed?: boolean;
    menuData?: MenuDataItem[];
    title?: string,
    style?: CSSProperties
}

const SiderMenu: React.FC<SiderMenuProps> = (props) => {
    const {collapsed, menuData, title, siderWidth = 256} = props;
    return (
        <Sider
            trigger={null}
            collapsible={true}
            collapsed={collapsed}
            width={siderWidth}
        >
            <div className={styles.siderMenuLogo}>
                <a href='/'>
                    <img src={logo} alt='logo'/>
                    <h1>{title}</h1>
                </a>
            </div>
            <BaseMeun menuData={menuData}/>
        </Sider>
    );
};

export default SiderMenu;
