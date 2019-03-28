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

const MiniArea = getComponent(React.lazy(() => import('./MiniArea')));

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
    yuan,
    MiniArea,
    ChartCard,
    Field,
}

export {
    Charts as default,
    yuan,
    MiniArea,
    ChartCard,
    Field
};