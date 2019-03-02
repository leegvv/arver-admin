export default [
    //app
    {
        path: '/',
        component: 'layouts/BasicLayout',
        authority: '',
        routes: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        name: '分析页',
                        component: 'pages/Dashboard/Analysis'
                    },
                    {
                        path: '/dashboard/monitor',
                        name: '监控页',
                        component: 'pages/Dashboard/Monitor'
                    },
                    {
                        path: '/dashboard/workplace',
                        name: '工作台',
                        component: 'pages/Dashboard/Workplace'
                    }
                ]
            }
        ]
    }
];