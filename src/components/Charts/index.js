import React, {Suspense} from 'react';
import ChartCard from './ChartCard';
import numeral from 'numeral';

const getComponent = Component => {
    return props => {
        return (
            <Suspense fallback='...'>
                <Component {...props}/>
            </Suspense>
        );
    }
};

const yuan = val => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
    yuan,
    ChartCard
}

export {
    Charts as default,
    yuan,
    ChartCard
};