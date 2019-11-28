import React, {useState, Fragment} from 'react';
import {Layout, Icon} from 'antd';
import styles from './index.module.less';
import {Helmet} from 'react-helmet';
import SiderMenu from '@/components/SiderMenu';
import getMenuData from '@/utils/getMenuData';
import {SiderMenuProps} from '@/components/SiderMenu';
import {Route} from '@/typings';
import {useIntl} from 'react-intl';
import {Settings} from 'src/config/defaultSettings';
import {connect} from 'react-redux';
import {ConnectState} from '@/models/connect';

const {Header, Footer, Content} = Layout;

export interface BasicLayoutProps extends SiderMenuProps, Partial<Settings>{
    route: Route,
    settings: Settings
}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {

    const {route, menu} = props;
    const {routes = []} = route;
    const intl = useIntl();
    const {menuData} = getMenuData(routes, menu, intl.formatMessage);

    const [collapsed, setCollapsed] = useState(false);
    return (
        <Fragment>
            <Helmet>
                <title>Ant Design Pro Title</title>
            </Helmet>
            <div className={styles.BasicLayout}>
                <Layout>
                    <SiderMenu collapsed={collapsed} menuData={menuData}/>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
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
        </Fragment>
    );
};

export default connect((state: ConnectState) => {
    console.log(state);
    return {settings: state.settings};
})(BasicLayout);
