import React, { Component, Fragment } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './BasicLayout.less';
import { Route, Redirect, Switch } from 'react-router-dom';
import SiderMenu from '../component/SiderMenu/SiderMenu';
import Header from './Header';
import Footer from './Footer';
import Media from 'react-media';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Context from './MenuContext';
import { connect } from 'react-redux';
import PageLoading from '@/component/PageLoading';

const { Content } = Layout;
const SubMenu = Menu.SubMenu;

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

class BasicLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    handleMenuCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap,
        };
    }

    render() {
        const menuList = [];
        const contentList = [];
        const { collapsed } = this.state;
        if (this.props.routes && this.props.routes.length > 0) {
            contentList.push(<Redirect key='root' from='/' exact to={this.props.routes[0].path}/>);
            for (let i = 0; i < this.props.routes.length; i++) {
                const route = this.props.routes[i];
                if (route.routes && route.routes.length > 0) {
                    contentList.push(<Redirect key='subRoot' from={route.path} exact to={route.routes[0].path}/>)
                    menuList.push(
                        <SubMenu
                            key={i}
                            title={<span><Icon type={route.icon} /><span>{route.name}</span></span>}
                        >
                            {route.routes.map((subRoute, subIndex) => {
                                if (subRoute.component) {
                                    const Comp = React.lazy(() => import('../' + subRoute.component));
                                    const compFunc = (() => {
                                        return (<React.Suspense fallback={<PageLoading/>}>
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
                            return (<React.Suspense fallback={<PageLoading/>}>
                                <Comp routes={route.routes}/>
                            </React.Suspense>);
                        });
                        contentList.push(<Route key={i} path={route.path} component={compFunc}/>)
                    }
                }
            }
        }

        const layout = (
            <Layout className='BasicLayout'>
                <SiderMenu menuList={menuList} collapsed={collapsed}/>
                <Layout style={{minHeight: '100vh'}}>
                    <Header collapsed handleMenuCollapse={this.handleMenuCollapse}/>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                        <Switch>
                            {contentList}
                        </Switch>
                    </Content>
                    <Footer/>;
                </Layout>
            </Layout>
        );


        return (
            <Fragment>
                <DocumentTitle title='标题'>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>{layout}</div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </Fragment>
        );
    }
}

export default connect()(props => (
    <Media query="(max-width: 599px)">
        {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
    </Media>
));