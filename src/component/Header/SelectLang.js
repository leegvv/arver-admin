import React, {PureComponent} from 'react';
import {Dropdown, Icon, Menu} from 'antd';
import styles from '@/component/Header/SelectLang.module.less';

class SelectLang extends PureComponent {
    render() {
        const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
        const languageLabels = {
            'zh-CN': '简体中文',
            'zh-TW': '繁体中文',
            'en-US': 'English',
            'pt-BR': 'Português'
        };
        const languageIcons = {
            'zh-CN': '🇨🇳',
            'zh-TW': '🇭🇰',
            'en-US': '🇬🇧',
            'pt-BR': '🇧🇷'
        };
        const langMenu = (
            <Menu
                className={styles.menu}
                onClick={this.changeLang}
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
            <Dropdown overlay={langMenu}>
                <span>
                    <Icon type='global'/>
                </span>
            </Dropdown>
        );
    }
}

export default SelectLang;