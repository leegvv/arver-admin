import React, {Component} from 'react';
import { Layout, Icon } from 'antd';

const { Header } = Layout;

class HeaderView extends Component {
    render() {
        const { collapsed, handleMenuCollapse } = this.props;
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                    className='trigger'
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={handleMenuCollapse}
                />
            </Header>
        );
    }
}

export default HeaderView;