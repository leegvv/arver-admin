import React, {Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

export interface RouteProps {
    redirect?: any,
    key?: any,
    path: string | undefined,
    exact?: boolean,
    strict?: boolean,
    location?: any,
    sensitive?: boolean,
    render?: any,
    Routes?: any,
    routes?: RouteProps[],
    component?: any
}

const genRouteArray = (routes: RouteProps[]|undefined): any[] => {
    if (!routes) {
        return [];
    }
    return routes.flatMap((route, index) => {
        const {path, component: Comp} = route;
        const childRoutes = genRouteArray(route.routes);

        if (Comp) {
            if (childRoutes.length > 0) {
                return [
                    <Route
                        key={index + '-0'}
                        path={path}
                        element={
                            <Navigate to={childRoutes[0].props.path}/>
                        }
                    />,
                    <Route
                        key={index}
                        path={path}
                        element={<Comp/>}
                    >
                        {childRoutes}
                    </Route>
                ];
            }
            return <Route key={index} path={path} element={<Comp/>}/>;
        }

        return [
            <Route
                key={index}
                path={path}
                element={<Navigate to={childRoutes[0].path}/>}
            />,
            ...childRoutes
        ];
    });
};

const renderRoutes = (routes: RouteProps[]|undefined) => {
    if (!routes) {
        return [];
    }
    const routeArray = genRouteArray(routes);

    return (
        <Suspense fallback={<h2>Loading</h2>}>
            <Routes>
                {routeArray}
            </Routes>
        </Suspense>
    );
};

export default renderRoutes;
