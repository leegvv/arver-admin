import React from 'react';
import {LocaleProvider} from 'antd';
import IntlProvider from './IntlProvider';
import moment from 'moment';
import 'moment/locale/zh-cn';

const localeInfo = {
    'en-US': {
        locale: 'en-US',
        antd: require('antd/lib/locale-provider/en_US').default,
        momentLocale: 'zh-cn',
        local: require('./locales/en-US').default
    },
    'zh-CN': {
        locale: 'zh-CN',
        antd: require('antd/lib/locale-provider/zh_CN').default,
        momentLocale: '',
        local: require('./locales/zh-CN').default
    }
}

const LocaleWrapper = (props) => {
    let {locale} = props;
    if (!localeInfo[locale]) {
        locale = 'zh-CN';
    }
    let antLocale = localeInfo[locale].antd;
    moment.locale(localeInfo[locale].momentLocale);
    const locales = {
        [localeInfo['zh-CN'].locale]: localeInfo['zh-CN'].local,
        [localeInfo['en-US'].locale]: localeInfo['en-US'].local
    }

   /* const key = localeInfo[locale].locale;
    const locales = {[key]: localeInfo[locale].local};*/

    return (
        <LocaleProvider locale={antLocale}>
            <IntlProvider locales={locales} currentLocale={locale}>
                {props.children}
            </IntlProvider>
        </LocaleProvider>
    );
}

export default LocaleWrapper;