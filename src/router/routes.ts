const routes = [
    {
        path: '/',
        component: require('../layouts/BlankLayout').default,
        routes: [
            {
                path: '/user',
                component: require('../layouts/UserLayout').defalut
            },
            {
                path: '/',
                component: require('../layouts/BasicLayout').default,
                routes: [
                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        icon: 'dashboard',
                        routes: [
                            {
                                name: 'analysis',
                                icon: 'smile',
                                path: '/dashboard/analysis',
                                component: require('../pages/dashboard/analysis').default,
                                exact: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
];

export default routes;
