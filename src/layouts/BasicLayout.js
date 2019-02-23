import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import './BasicLayout.less';
import { Route, Redirect } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const menuList = [];
        const contentList = [];
        if (this.props.routes && this.props.routes.length > 0) {
            contentList.push(<Redirect from='/' to={this.props.routes[0].path}/>);
            for (let i = 0; i < this.props.routes.length; i++) {
                const route = this.props.routes[i];
                if (route.routes && route.routes.length > 0) {
                    contentList.push(<Redirect from={route.path} to={route.routes[0].path}/>)
                    menuList.push(
                        <SubMenu
                            key={i}
                            title={<span><Icon type={route.icon} /><span>{route.name}</span></span>}
                        >
                            {route.routes.map((subRoute, subIndex) => {
                                if (subRoute.component) {
                                    const Comp = React.lazy(() => import('../' + subRoute.component));
                                    const compFunc = (() => {
                                        return (<React.Suspense fallback={<div>Loading...</div>}>
                                            <Comp routes={route.routes}/>
                                        </React.Suspense>);
                                    });
                                    contentList.push(<Route key={i + '-' + subIndex} path={subRoute.path} component={compFunc}/>)
                                }
                                return (<Menu.Item key={i + '-' + subIndex}><Link to={subRoute.path}>{subRoute.name}</Link></Menu.Item>);
                            })}
                        </SubMenu>
                    );

                } else {
                    menuList.push(
                        <Menu.Item key={i}>
                            <Link to={route.path}>
                                <Icon type={route.icon} />
                                <span>{route.name}</span>
                            </Link>
                        </Menu.Item>
                    );
                    if (route.component) {
                        const Comp = React.lazy(() => import('../' + route.component));
                        const compFunc = (() => {
                            return (<React.Suspense fallback={<div>Loading...</div>}>
                                <Comp routes={route.routes}/>
                            </React.Suspense>);
                        });
                        contentList.push(<Route key={i} path={route.path} component={compFunc}/>)
                    }
                }
            }
        }

        return (
            <Layout className='BasicLayout'>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    width="256px"
                >
                    <div className="sider-menu-index-logo logo" >
                        <Link to="/">
                            <img src={logo} alt="logo"/>
                            <h1>Ant Design Pro</h1>
                        </Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {menuList}
                    </Menu>
                </Sider>
                <Layout style={{minHeight: '100vh'}}>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className='trigger'
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        {contentList}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default BasicLayout;