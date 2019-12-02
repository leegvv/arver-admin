import React from 'react';
import './App.less';
import RouterWrapper from './router/RouterWrapper';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '@/models/reducers';

const App: React.FC = () => {
    const store = createStore(reducers);

    return (
        <Provider store={store}>
            <RouterWrapper/>
        </Provider>
    );
}

export default App;
