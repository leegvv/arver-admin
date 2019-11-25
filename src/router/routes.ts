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
                            },
                            {
                                name: 'monitor',
                                icon: 'smile',
                                path: '/dashboard/monitor',
                                component: require('../pages/dashboard/monitor').default,
                                exact: true,
                            },
                            {
                                name: 'workplace',
                                icon: 'smile',
                                path: '/dashboard/workplace',
                                component: require('../pages/dashboard/workplace').default,
                                exact: true,
                            },
                        ]
                    },
                    {
                        path: '/form',
                        icon: 'form',
                        name: 'form',
                        routes: [
                            {
                                name: 'basic-form',
                                icon: 'smile',
                                path: '/form/basic-form',
                                component: require('../pages/form/basic-form').default,
                                exact: true,
                            }
                        ]
                    }
                ]
            }
        ]
    },
];

export default routes;
