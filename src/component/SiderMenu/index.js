import React from 'react';
import SiderMenu from './SiderMenu';
import {getFlatMenuKeys} from './SiderMenuUtils';
import {Drawer} from 'antd';

const SiderMenuWrapper = React.memo((props) => {
    const {isMobile, menuData, collapsed, onCollapsed} = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);

    if (isMobile) {
        return (<Drawer
            collapsed={collapsed}
            placement='left'
            onClose={() => onCollapsed(true)}
            style={{
                padding: 0,
                height: '100vh'
            }}

        >
            <SiderMenu
                {...props}
                flatMenuKeys={flatMenuKeys}
                collapsed={isMobile ? false : collapsed}
            />
        </Drawer>);
    }

    return (
        <SiderMenu
            {...props}
            flatMenuKeys={flatMenuKeys}
        />
    );
});

export default SiderMenuWrapper;