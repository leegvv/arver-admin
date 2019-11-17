import React from 'react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import 'moment/locale/pt-br';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';

let defaultAntd = require('antd/lib/locale-provider/zh_CN');
defaultAntd = defaultAntd.default || defaultAntd;

const localeInfo = {
    'en-US': {
        messages: {},
        locale: 'en-US',
        antd: require('antd/lib/locale-provider/en_US'),
        data: {},
        momentLocale: ''
    },
    'zh-CN': {
        messages: {},
        locale: 'zh-CN',
        antd: require('antd/lib/locale-provider/zh_CN'),
        data: {},
        momentLocale: 'zh-cn'
    }
};

const LocaleWrapper : React.FC = (props) => {
    const getAppLocale = () => {
        let appLocale = {
            messages: {},
            locale: 'zh-CN',
            antd: require('antd/lib/locale-provider/zh_CN'),
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
    const antdLocale = appLocale.antd ? (appLocale.antd.default || appLocale.antd) : defaultAntd;

    return (
        <ConfigProvider locale={antdLocale}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                {props.children}
            </IntlProvider>
        </ConfigProvider>
    );
}

export default LocaleWrapper;
