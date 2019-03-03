import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import routeConfig from './config/route.config';
import createHistory from 'history/createBrowserHistory';
import PageLoading from '@/component/PageLoading';
import defaultSettings from '@/defaultSettings';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

const history = createHistory();

class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locale: zhCN
        };
        moment.locale('zh-cn');
    }

    getMenuData = (routes = []) => {
        const menuData = [];
        for (const route of routes) {
            const menu = {
                name: route.name,
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
                        name: subRoute.name,
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

    changeLocale = (e) => {
        const localeValue = e.target.value;
        this.setState({locale: localeValue});
        if (localeValue && localeValue === zhCN) {
            moment.locale('zh-cn');
        } else {
            moment.locale('en');
        }
    }

    render() {
        const {locale} = this.state;
        return (
            <LocaleProvider locale={locale}>
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
            </LocaleProvider>
        );
    }
}

export default Container;
