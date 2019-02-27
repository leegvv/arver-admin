import React, { Component } from 'react';
import './Container.less';
import { Router, Route, Switch } from 'react-router-dom';
import routeConfig from './config/route.config';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import PageLoading from '@/component/PageLoading';

// import reducers from './reducers' // Or wherever you keep your reducers
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        // ...reducers,
        router: routerReducer
    }),
    applyMiddleware(middleware)
)



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
                            <Comp menuData={route.routes} {...props} />
                        </React.Suspense>);
                    });
                    const subMenu = {
                        name: subRoute.name,
                        path: subRoute.path,
                        locale: subRoute.name,
                        authority: subRoute.authority,
                        exact: true,
                        component: compFunc
                    }
                    children.push(subMenu);
                }
                menu.children = children;
            }
            menuData.push(menu);
        }
        return menuData;
    }

    render() {
        return (
            <Provider store={store}>
                {/*<ConnectedRouter history={history}>*/}
                <Router history={history}>
                    <Switch>
                    {
                        routeConfig.map((route, index) => {
                            if (route.component) {
                                const Comp = React.lazy(() => import('./' + route.component));
                                const render = ((props) => {
                                    return (<React.Suspense fallback={<PageLoading/>}>
                                        <Comp menuData={this.getMenuData(route.routes)} {...props} />
                                    </React.Suspense>);
                                });
                                return (
                                    <Route key={index} to={route.path} render={render}/>
                                );
                            }
                            return null;
                        })
                    }
                {/*</ConnectedRouter>*/}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default Container;
