import React from 'react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import 'moment/locale/zh-cn';
import zhCN from '@/locales/zh-CN';
import enUS from '@/locales/en-US';
import antdZhCN from 'antd/lib/locale-provider/zh_CN';
import antdEnUS from 'antd/lib/locale-provider/en_US';


let defaultAntd = require('antd/lib/locale-provider/zh_CN');
defaultAntd = defaultAntd.default || defaultAntd;

const localeInfo = {
    'en-US': {
        messages: enUS,
        locale: 'en-US',
        antd: antdEnUS,
        data: {},
        momentLocale: ''
    },
    'zh-CN': {
        messages: zhCN,
        locale: 'zh-CN',
        antd: antdZhCN,
        data: {},
        momentLocale: 'zh-cn'
    }
};

const LocaleWrapper : React.FC = (props) => {
    const getAppLocale = () => {
        let appLocale = {
            messages: {},
            locale: 'zh-CN',
            antd: antdZhCN,
            data: {},
            momentLocale: 'zh-cn'
        };

        if (
            localStorage
            && localStorage.getItem('arver_admin_locale')
            // @ts-ignore
            && localeInfo[localStorage.getItem('arver_admin_locale')]
        ) {
            // @ts-ignore
            appLocale = localeInfo[localStorage.getItem('arver_admin_locale')];
        } else if (
            navigator
            // @ts-ignore
            && localeInfo[navigator.language]
        ) {
            // @ts-ignore
            appLocale = localeInfo[navigator.language];
        } else {
            appLocale = localeInfo['zh-CN'] || appLocale;
        }
        return appLocale;
    };

    const appLocale = getAppLocale();
    const antdLocale = appLocale.antd ? (appLocale.antd) : defaultAntd;

    return (
        <ConfigProvider locale={antdLocale}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                {props.children}
            </IntlProvider>
        </ConfigProvider>
    );
};

export default LocaleWrapper;
