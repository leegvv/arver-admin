import React, {Component, Fragment} from 'react';
import {Layout} from 'antd';
import {Route, Redirect, Switch} from 'react-router-dom';
import SiderMenu from '../components/SiderMenu';
import Header from './Header';
import Footer from './Footer';
import Media from 'react-media';
import DocumentTitle from 'react-document-title';
import {ContainerQuery} from 'react-container-query';
import classNames from 'classnames';
import Context from './MenuContext';
import logo from '../assets/logo.svg';

const {Content} = Layout;

/* eslint-disable */
const query = {
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
/* eslint-enable*/

class BasicLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    handleMenuCollapse = (collapsed) => {
        this.setState({
            collapsed: collapsed
        });
    };

    getContext() {
        const {location, breadcrumbNameMap} = this.props;
        return {
            location,
            breadcrumbNameMap
        };
    }

    render() {
        const {menuData, isMobile, locale, changeLocale} = this.props;
        const contentList = [];
        const {collapsed} = this.state;
        if (menuData && menuData.length > 0) {
            contentList.push(<Redirect
                key='root'
                from='/'
                exact={true}
                to={menuData[0].path}
            />);
            for (let i = 0; i < menuData.length; i++) {
                const data = menuData[i];
                const {children} = data;
                if (children && children.length > 0) {
                    for (let j = 0; j < children.length; j++) {
                        const child = children[j];
                        contentList.push(<Route
                            key={j}
                            path={child.path}
                            component={child.component}
                        />);
                    }
                    contentList.push(<Redirect
                        key='subRoot'
                        from={data.path}
                        exact={true}
                        to={data.children[0].path}
                    />);
                } else if (children.component) {
                    contentList.push(<Route
                        key={i}
                        path={children.path}
                        component={children.component}
                    />);
                }
            }
        }

        const layout = (
            <Layout className='BasicLayout'>
                <SiderMenu
                    menuData={menuData}
                    collapsed={collapsed}
                    onCollapse={this.handleMenuCollapse}
                    logo={logo}
                    {...this.props}
                />
                <Layout style={{minHeight: '100vh'}}>
                    <Header
                        collapsed={collapsed}
                        handleMenuCollapse={this.handleMenuCollapse}
                        logo={logo}
                        isMobile={isMobile}
                        locale={locale}
                        changeLocale={changeLocale}
                    />
                    <Content style={{margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}}>
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
                        {(params) => (
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

export default ((props) => (
    <Media query='(max-width: 599px)'>
        {(isMobile) => (<BasicLayout
            {...props}
            isMobile={isMobile}
        />)}
    </Media>
));