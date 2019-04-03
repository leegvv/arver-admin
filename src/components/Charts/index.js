import React, {Suspense} from 'react';
import ChartCard from './ChartCard';
import numeral from 'numeral';
import Field from './Field';

const getComponent = Component => {
    return props => {
        return (
            <Suspense fallback='...'>
                <Component {...props}/>
            </Suspense>
        );
    }
};

const Bar = getComponent(React.lazy(() => import('./Bar')));
const MiniArea = getComponent(React.lazy(() => import('./MiniArea')));
const MiniBar = getComponent(React.lazy(() => import('./MiniBar')));
const MiniProgress = getComponent(React.lazy(() => import('./MiniProgress')));

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
    yuan,
    Bar,
    MiniArea,
    MiniBar,
    MiniProgress,
    ChartCard,
    Field,
}

export {
    Charts as default,
    yuan,
    Bar,
    MiniArea,
    MiniBar,
    MiniProgress,
    ChartCard,
    Field
};