import React, {Component} from 'react';
import {Layout, Icon} from 'antd';
import styles from './Header.module.less';
import {Link} from 'react-router-dom';
import RightContent from '@/component/Header/RightContent';

const {Header} = Layout;

class HeaderView extends Component {
    render() {
        const {collapsed, handleMenuCollapse, isMobile} = this.props;
        return (
            <Header style={{padding: 0, width: '100%'}}>
                <div className={styles.header}>
                    {isMobile && (
                        <Link
                            to='/'
                            key='logo'
                        >
                            <img/>
                        </Link>
                    )}
                    <span
                        className={styles.trigger}
                        onClick={() => handleMenuCollapse(!collapsed)}
                    >
                        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                    </span>
                    <RightContent {...this.props}/>
                </div>
            </Header>
        );
    }
}

export default HeaderView;