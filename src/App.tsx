import React from 'react';
import './App.less';
import RouterWrapper from './router/RouterWrapper';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducers from '@/models/reducers';
import {ErrorBoundary} from './components';

const App: React.FC = () => {
    const store = createStore(reducers);

    return (
        <ErrorBoundary>
            <Provider store={store}>
                <RouterWrapper/>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
