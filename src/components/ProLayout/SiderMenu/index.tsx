import React, {CSSProperties} from 'react';
import SiderMenu, {SiderMenuProps} from './SiderMenu';

const SiderMenuWrapper: React.FC<SiderMenuProps> = props => {
    const {menuData, siderWidth, style, className} = props;

    return <SiderMenu {...props}/>

};

export default SiderMenuWrapper;
