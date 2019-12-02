import React from 'react';
import SiderMenu, {SiderMenuProps} from './SiderMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = props => {
    return <SiderMenu {...props}/>
};

export default SiderMenuWrapper;
