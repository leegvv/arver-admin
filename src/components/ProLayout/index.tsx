import React from 'react';
import ProLayout, {ProLayoutProps} from './ProLayout';

const ProLayoutWrapper: React.FC<ProLayoutProps> = (props) => {
    return (
        <ProLayout {...props}/>
    );
};

export default ProLayoutWrapper;
