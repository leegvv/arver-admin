import React, {PureComponent} from 'react';
import {Icon} from 'antd';
import styles from './index.module.less';
import {Link} from 'react-router-dom';
import RightContent from '@/component/GlobalHeader/RightContent';

class GlobalHeader extends PureComponent {
    render() {
        const {isMobile, collapsed, handleMenuCollapse} = this.props;
        return (
            <div className={styles.header}>
                {isMobile && (
                    <Link
                        to='/'
                        key='logo'
                    >
                        <img alt='logo'/>
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
        );
    }
}

export default GlobalHeader;