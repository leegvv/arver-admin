import React, {Component} from 'react';
import {DatePicker} from 'antd';

class Analysis extends Component {

    componentDidMount() {
        fetch('/api/chart',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json())
            .then((data) => {
                console.log(data);
            }
        );
    }

    render() {
        return (
            <div>
                Analysis11
                <DatePicker/>
            </div>
        );
    }
}

export default Analysis;