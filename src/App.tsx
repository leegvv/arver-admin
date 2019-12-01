import React, {useEffect} from 'react';
import './App.less';
import RouterWrapper from './router/RouterWrapper';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '@/models/reducers';

const App: React.FC = () => {

    /*useEffect(() => {
        fetch('/api/fake_chart_data')
            .then((response => response.json()))
            .then(data => console.log(data)
        );
    });*/

    const store = createStore(reducers);

    return (
        <Provider store={store}>
            <RouterWrapper/>
        </Provider>
    );
}

export default App;
