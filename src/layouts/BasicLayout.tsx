import React from 'react';
import {ProLayout, ProLayoutProps} from '@/components';
import {connect} from 'react-redux';
import {ConnectState} from '@/models/connect';
import {Outlet} from 'react-router-dom';
import routes from '@/router/routes';

const BasicLayout: React.FC<ProLayoutProps> = (props) => {
    const {settings} = props;

    return (
        <ProLayout
            {...props}
            {...settings}
        >
            <Outlet/>
        </ProLayout>
    );
};
export default connect(({settings}: ConnectState) => {
    return {settings};
})(BasicLayout);
