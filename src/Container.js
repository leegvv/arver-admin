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
                                const compFunc = (() => {
                                    return (<React.Suspense routes={route.routes} fallback={<PageLoading/>}>
                                        <Comp routes={route.routes}/>
                                    </React.Suspense>);
                                });
                                return (
                                    <Route key={index} to={route.path} component={compFunc}/>
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
