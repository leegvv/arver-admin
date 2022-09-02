import React from 'react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import 'moment/locale/zh-cn';
import zhCN from '@/locales/zh-CN';
import enUS from '@/locales/en-US';
import antdZhCN from 'antd/lib/locale-provider/zh_CN';
import antdEnUS from 'antd/lib/locale-provider/en_US';
import {Locale} from 'antd/lib/locale-provider';

const defaultAntd = antdZhCN;

interface LocaleInfo {
    [key: string]: {
        messages: object,
        locale: string,
        antd: Locale,
        data: object,
        momentLocale: string
    };
}

const localeInfo: LocaleInfo = {
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

interface LocaleWrapperProps {
    children?: React.ReactNode
}

const LocaleWrapper : React.FC<LocaleWrapperProps> = (props) => {
    const getAppLocale = () => {
        let appLocale = {
            messages: {},
            locale: 'zh-CN',
            antd: antdZhCN,
            data: {},
            momentLocale: 'zh-cn'
        };

        const locale = String(localStorage && localStorage.getItem('arver_admin_locale'));
        if (
            locale &&
            localeInfo[locale]
        ) {
            appLocale = localeInfo[locale];
        } else if (
            navigator &&
            localeInfo[navigator.language]
        ) {
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
