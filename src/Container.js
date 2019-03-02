import React, {Component} from 'react';
import './Container.less';
import {Router, Route, Switch} from 'react-router-dom';
import routeConfig from './config/route.config';
import createHistory from 'history/createBrowserHistory';
import PageLoading from '@/component/PageLoading';

const history = createHistory();

class Container extends Component {

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

    render() {
        return (
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
        );
    }
}

export default Container;
