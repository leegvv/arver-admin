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
                {/*<Route to='/' exact={true} component={BlankLayout}/>
                <Route to='/basic' exact={true} component={BasicLayout}/>*/}
            </Router>
        </LocaleWrapper>
    );
};

export default RouterWrapper;
