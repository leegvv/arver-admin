import React, { Component, Fragment } from 'react';
import './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routeConfig from './config/route.config';

class App extends Component {
    render() {

        return (
            <BrowserRouter>
                <Fragment>
                    <Switch>
                        {
                            routeConfig.map((route, index) => {
                                if (route.component) {
                                    const Comp = React.lazy(() => import('./' + route.component));
                                    const compFunc = (() => {
                                        return (<React.Suspense fallback={<div>Loading...</div>}>
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
                    </Switch>
                </Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
