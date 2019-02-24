import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const { Sider } = Layout;
class SiderMenu extends PureComponent {
    render() {
        const { collapsed, menuList } = this.props;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width="256px"
            >
                <div className="sider-menu-index-logo logo" >
                    <Link to="/">
                        <img src={logo} alt="logo"/>
                        <h1>Ant Design Pro</h1>
                    </Link>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    {menuList}
                </Menu>
            </Sider>
        );
    }
}

SiderMenu.propTypes = {
    menuList: PropTypes.array
};

export default SiderMenu;