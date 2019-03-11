import React, {PureComponent} from 'react';
import SelectLang from '@/component/SelectLang';
import styles from './index.module.less';

class RightContext extends PureComponent {
    render() {
        const {theme, locale, changeLocale} = this.props;
        let className = styles.right;
        if (theme === 'dark') {
            className = `${styles.right} ${styles.dark}`;
        }
        return (
            <div className={className}>
                <SelectLang className={styles.action} locale={locale}  changeLocale={changeLocale}/>
            </div>
        );
    }
}

export default RightContext;