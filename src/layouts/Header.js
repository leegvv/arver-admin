import React, {Component} from 'react';
import {Layout} from 'antd';
import GlobalHeader from '@/components/GlobalHeader';

const {Header} = Layout;

class HeaderView extends Component {
    render() {
        return (
            <Header style={{padding: 0, width: '100%'}}>
                <GlobalHeader
                    {...this.props}
                />
            </Header>
        );
    }
}

export default HeaderView;