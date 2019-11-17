import React, {useState, Fragment} from 'react';
import {Layout, Menu, Icon} from 'antd';
import styles from './index.module.less';
import {Helmet} from 'react-helmet';
import SiderMenu from '@/components/SiderMenu';

const {Header, Footer, Content} = Layout;

const BasicLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Fragment>
            <Helmet>
                <title>Ant Design Pro Title</title>
            </Helmet>
            <div className={styles.BasicLayout}>
                <Layout>
                    <SiderMenu collapsed={collapsed}/>
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

export default BasicLayout;
