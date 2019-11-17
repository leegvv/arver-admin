import React, {useEffect} from 'react';
import './App.less';
import RouterWrapper from './router/RouterWrapper';

const App: React.FC = () => {

    useEffect(() => {
        fetch('/api/fake_chart_data')
            .then((response => response.json()))
            .then(data => console.log(data)
        );
    });

    return (
        <RouterWrapper/>
    );
}

export default App;
