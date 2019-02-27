import React, { PureComponent, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import PageLoading from '@/component/PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';
import { urlToList } from '../utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import { isUrl } from '@/utils/utils';
import styles from './index.less';
import IconFont from '@/component/IconFont';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const getIcon = icon => {
    if (typeof icon === 'string') {
        if (isUrl(icon)) {
            return <Icon component={() => <img src={icon} alt="icon" className={styles.icon} />} />;
        }
        if (icon.startsWith('icon-')) {
            return <IconFont type={icon} />;
        }
        return <Icon type={icon} />;
    }
    return icon;
};


class SiderMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname, flatMenuKeysLen } = state;
        if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
            return {
                pathname: props.location.pathname,
                flatMenuKeysLen: props.flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props),
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key) {
                return item.key === key || item.path === key;
            }
            return false;
        });
    };

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    };

    getSelectedMenuKeys = pathname => {
        const { flatMenuKeys } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    };

    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = (menusData, parent) => {
        if (!menusData) {
            return [];
        }
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => this.getSubMenuOrItem(item, parent))
            .filter(item => item);
    };

    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = item => {
        // doc: add hideChildrenInMenu
        if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
            const { name } = item;
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                {getIcon(item.icon)}
                                <span>{name}</span>
              </span>
                        ) : (
                            name
                        )
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            );
        }
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    };

    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = item => {
        const { name } = item;
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location, isMobile, onCollapse } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
                onClick={
                    isMobile
                        ? () => {
                            onCollapse(true);
                        }
                        : undefined
                }
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        }
        return `/${path || ''}`.replace(/\/+/g, '/');
    };


    render() {
        const { collapsed, menuData, location: { pathname } } = this.props;
        const { openKeys } = this.state;

        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length && openKeys) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        let props = {};
        if (openKeys && !collapsed) {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
            };
        }

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
                <Suspense fallback={<PageLoading/>}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        onOpenChange={this.handleOpenChange}
                        selectedKeys={selectedKeys}
                        {...props}
                    >
                        {this.getNavMenuItems(menuData)}
                    </Menu>
                </Suspense>
            </Sider>
        );
    }
}

SiderMenu.propTypes = {
    menuData: PropTypes.array
};

export default SiderMenu;