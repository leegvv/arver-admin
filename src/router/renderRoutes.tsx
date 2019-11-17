import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

export interface RouteProps {
    redirect?: any,
    key?: any,
    path: string | undefined,
    exact?: boolean,
    strict?: boolean,
    location?: any,
    sensitive?: boolean,
    render?: Function,
    Routes?: any,
    routes?: RouteProps[],
    component?: Function
}

const renderRoutes = (routes: RouteProps[] | undefined, extraProps?: object, switchProps?: object) => {
    if (!routes) {
        return null;
    }
    const routeArray = routes.map((route, index) => {
        const {redirect, key, path, exact, strict, location, sensitive} = route;
        if (redirect) {
            return (
                <Redirect
                    key={key || index}
                    from={path}
                    to={redirect}
                    exact={exact}
                    strict={strict}
                />
            );
        }

        return (
            <Route
                key={key || index}
                path={path}
                exact={exact}
                strict={strict}
                location={location}
                sensitive={sensitive}
                render={(props) => {
                    const childRoutes = renderRoutes(route.routes, extraProps, {location: props.location});
                    const Component = route.component;
                    if (Component) {
                        return (
                            <Component>
                                {childRoutes}
                            </Component>
                        );
                    } else {
                        return childRoutes;
                    }
                }}
            />
        );

    })

    return (
        <Switch
            {...switchProps}
        >
            {routeArray}
        </Switch>
    );

};

export default renderRoutes;
