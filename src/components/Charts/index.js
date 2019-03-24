import React, {Suspense} from 'react';
import ChartCard from './ChartCard';

const getComponent = Component => {
    return props => {
        return (
            <Suspense fallback='...'>
                <Component {...props}/>
            </Suspense>
        );
    }
};

const Charts = {
    ChartCard
}

export {
    Charts as default,
    ChartCard
};