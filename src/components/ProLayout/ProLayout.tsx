import React, {useState, CSSProperties} from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Layout } from 'antd';
import styles from './index.module.less';
import {Helmet} from 'react-helmet';
import SiderMenu from '@/components/ProLayout/SiderMenu';
import getMenuData from '@/components/ProLayout/utils/getMenuData';
import {SiderMenuProps} from './SiderMenu/SiderMenu';
import {MenuDataItem, MessageDescriptor, Route, RouterTypes, WithFalse} from '@/typings';
import {useIntl} from 'react-intl';
import {Settings} from './defaultSettings';
import {useMediaQuery} from 'react-responsive';
import classNames from 'classnames';
import {BaseMenuProps} from '@/components/ProLayout/SiderMenu/BaseMenu';
import {localeType} from './locales';

const {Header, Footer, Content} = Layout;

export interface ProLayoutProps extends Partial<RouterTypes<Route>>, SiderMenuProps, Partial<Settings>{
    logo?: React.ReactNode | WithFalse<() => React.ReactNode>;
    route: Route,
    settings: Settings,
    locale?: localeType;

    onCollapse?: (collapsed: boolean) => void;

    menuItemRender?: BaseMenuProps['menuItemRender'];
    menuDataRender?: (menuData: MenuDataItem[]) => MenuDataItem[];

    formatMessage?: (message: MessageDescriptor) => string;
    /**
     * 是否禁用移动端模式，有的管理系统不需要移动端模式，此属性设置为true即可
     */
    disableMobile?: boolean;
    contentStyle?: CSSProperties;
    isChildrenLayout?: boolean;

    className?: string;

    /**
     * 兼用 content的 margin
     */
    disableContentMargin?: boolean;
}

const MediaQueryEnum = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
};

const getScreenClassName = () => {
    let className = '';
    Object.keys(MediaQueryEnum).forEach(key => {
        // @ts-ignore
        if (useMediaQuery(MediaQueryEnum[key])) {
            className = key
        }
    });
    return className;
}

const ProLayout: React.FC<ProLayoutProps> = (props) => {

    const {route, menu, title, style} = props;
    const {routes = []} = route;
    const intl = useIntl();
    const {menuData} = getMenuData(routes, menu, intl.formatMessage);

    const className = classNames(
        getScreenClassName(),
        props.className,
        'ant-design-pro',
        styles.antProBasicLayout
    );

    const [collapsed, setCollapsed] = useState(false);
    return <>
        <Helmet>
            <title>Ant Design Pro Title</title>
        </Helmet>
        <div className={className}>
            <Layout
                style={{
                    ...style,
                    height: '100%'
                }}
            >
                <SiderMenu collapsed={collapsed} menuData={menuData} title={title}/>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <LegacyIcon
                            className='trigger'
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280
                        }}
                    >
                        Content
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    </>;
};

export default ProLayout;
