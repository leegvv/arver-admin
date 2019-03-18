import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import routeConfig from './config/route.config';
import {createBrowserHistory} from 'history';
import PageLoading from '@/component/PageLoading';
import defaultSettings from '@/defaultSettings';
import 'moment/locale/zh-cn';
import LocaleWrapper from './LocaleWrapper';
import intl from 'react-intl-universal';

const history = createBrowserHistory();

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {locale: 'zh-CN'}
    }


    changeLocale = (locale) => {
        this.setState({locale: locale});
        intl.options.currentLocale=locale;
    }

    getMenuData = (routes = []) => {
        const menuData = [];
        for (const route of routes) {
            const menu = {
                name: intl.get(route.name),
                path: route.path,
                icon: route.icon,
                locale: route.name,
                authority: route.authority
            };
            if (route.routes) {
                const children = [];
                for (const subRoute of route.routes) {
                    const Comp = React.lazy(() => import('./' + subRoute.component));
                    const compFunc = ((props) => {
                        return (<React.Suspense fallback={<PageLoading/>}>
                            <Comp
                                menuData={route.routes}
                                {...props}
                            />
                        </React.Suspense>);
                    });
                    const subMenu = {
                        name: intl.get(subRoute.name),
                        path: subRoute.path,
                        locale: subRoute.name,
                        authority: subRoute.authority,
                        exact: true,
                        component: compFunc
                    };
                    children.push(subMenu);
                }
                menu.children = children;
            }
            menuData.push(menu);
        }
        return menuData;
    };


    render() {
        const {locale} = this.state;
        return (
            <LocaleWrapper locale={locale}>
                <Router history={history}>
                    <Switch>
                        {
                            routeConfig.map((route, index) => {
                                if (route.component) {
                                    const Comp = React.lazy(() => import('./' + route.component));
                                    const render = ((props) => {
                                        return (<React.Suspense fallback={<PageLoading/>}>
                                            <Comp
                                                menuData={this.getMenuData(route.routes)}
                                                locale={locale}
                                                changeLocale={this.changeLocale}
                                                {...defaultSettings}
                                                {...props}
                                            />
                                        </React.Suspense>);
                                    });
                                    return (
                                        <Route
                                            key={index}
                                            to={route.path}
                                            render={render}
                                        />
                                    );
                                }
                                return null;
                            })
                        }
                    </Switch>
                </Router>
            </LocaleWrapper>
        );
    }
}

export default Container;
