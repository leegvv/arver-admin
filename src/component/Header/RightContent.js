import React, {PureComponent} from 'react';
import SelectLang from '@/component/Header/SelectLang';
import styles from './RightContent.module.less';

class RightContext extends PureComponent {
    render() {
        const {theme} = this.props;
        let className = styles.right;
        if (theme === 'dark') {
            className = `${styles.right} ${styles.dark}`;
        }
        return (
            <div className={className}>
                <SelectLang/>
            </div>
        );
    }
}

export default RightContext;