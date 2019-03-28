import React, {PureComponent} from 'react';
import {Chart, Axios} from 'bizcharts';

class MiniArea extends PureComponent {
    render() {
        const {height} = this.props;
        return (
            <div>
                <div>
                    {height && 'chart'}
                </div>
            </div>
        );
    }
}

export default MiniArea;