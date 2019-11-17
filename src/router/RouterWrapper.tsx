import React from 'react';
import LocaleWrapper from '../container/LocaleWrapper';
import {BrowserRouter as Router} from 'react-router-dom';
import renderRoutes from './renderRoutes';
import routes from './routes';

const RouterWrapper: React.FC = () => {
    return (
        <LocaleWrapper>
            <Router>
                {renderRoutes(routes)}
            </Router>
        </LocaleWrapper>
    );
};

export default RouterWrapper;
