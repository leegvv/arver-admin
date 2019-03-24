import React, {PureComponent} from 'react';
import {Icon, Menu} from 'antd';
import HeaderDropdown from '@/components/HeaderDropdown'
import styles from '@/components/SelectLang/index.module.less';
import classNames from 'classnames';

class SelectLang extends PureComponent {

    render() {
        const {className, changeLocale, locale} = this.props;
        const locales = ['zh-CN', 'en-US'];
        const languageLabels = {
            'zh-CN': '简体中文',
            'en-US': 'English'
        };
        const languageIcons = {
            'zh-CN': '🇨🇳',
            'en-US': '🇬🇧'
        };

        const langMenu = (
            <Menu
                className={styles.menu}
                onClick={({key}) => changeLocale(key)}
                selectedKeys={[locale]}
            >
                {locales.map((locale) => (
                    <Menu.Item key={locale}>
                        <span
                            role='img'
                            aria-label={languageLabels[locale]}
                        >
                            {languageIcons[locale]}
                        </span>
                        {' '}
                        {languageLabels[locale]}
                    </Menu.Item>
                ))}
            </Menu>
        );
        return (
            <HeaderDropdown overlay={langMenu} placement='bottomRight'>
                <span className={classNames(styles.dropDown, className)}>
                    <Icon type='global' title='语言'/>
                </span>
            </HeaderDropdown>
        );
    }
}

export default SelectLang;