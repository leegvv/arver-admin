export default [
    //app
    {
        path: '/',
        component: 'layouts/BasicLayout',
        authority: '',
        routes: [
            {
                path: '/dashboard',
                name: 'menu.dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        name: 'menu.dashboard.analysis',
                        component: 'pages/Dashboard/Analysis'
                    },
                    {
                        path: '/dashboard/monitor',
                        name: 'menu.dashboard.monitor',
                        component: 'pages/Dashboard/Monitor'
                    },
                    {
                        path: '/dashboard/workplace',
                        name: 'menu.dashboard.workplace',
                        component: 'pages/Dashboard/Workplace'
                    }
                ]
            }
        ]
    }
];