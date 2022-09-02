import {lazy} from 'react';
import {DashboardOutlined, SmileOutlined, FormOutlined} from '@ant-design/icons';

const routes = [
    {
        path: '/',
        component: lazy(() => import('../layouts/BlankLayout')),
        routes: [
            {
                path: '/user',
                component: lazy(() => import('../layouts/UserLayout')),
                routes: [
                    {
                        name: 'login',
                        icon: SmileOutlined,
                        path: '/user/login',
                        component: lazy(() => import('../pages/Login'))
                    }
                ]
            },
            {
                path: '/',
                component: lazy(() => import('../layouts/BasicLayout')),
                routes: [
                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        icon: DashboardOutlined,
                        routes: [
                            {
                                name: 'analysis',
                                icon: SmileOutlined,
                                path: '/dashboard/analysis',
                                component: lazy(() => import('../pages/dashboard/analysis'))
                            },
                            {
                                name: 'monitor',
                                icon: SmileOutlined,
                                path: '/dashboard/monitor',
                                component: lazy(() => import('../pages/dashboard/monitor'))
                            },
                            {
                                name: 'workplace',
                                icon: SmileOutlined,
                                path: '/dashboard/workplace',
                                component: lazy(() => import('../pages/dashboard/workplace'))
                            }
                        ]
                    },
                    {
                        path: '/form',
                        icon: FormOutlined,
                        name: 'form',
                        routes: [
                            {
                                name: 'basic-form',
                                icon: SmileOutlined,
                                path: '/form/basic-form',
                                component: lazy(() => import('../pages/form/basic-form'))
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export default routes;
