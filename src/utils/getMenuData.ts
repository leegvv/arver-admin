import {MenuDataItem, Route} from '@/typings';
import {FormattedMessage} from 'react-intl';
import {DefaultSettings} from '@/../../config/defaultSettings'

interface FormatterProps {
    data: MenuDataItem[],
    menu: DefaultSettings['menu'],
    parentName?: string
}

const formatter = (props: FormatterProps): MenuDataItem[] => {
    const {data = [], menu, parentName} = props;
    return data.filter(item => item && item.name && item.path)
        .map((item = {path: ''}) => {
            const {name} = item;
            if (!name) {
                return item;
            }
            const locale = `${parentName || 'menu'}.${name}`;
            /*const localeName =
                menu.locale
                    ? name
                    : formatMessage({ id: locale, defaultMessage: name });*/
            const localeName = menu.locale ? name : '国际化名称';


            const result: MenuDataItem = {
                ...item,
                name: localeName,
                locale,
                routes: null
            };
            if (item.routes) {
                const children = formatter({
                    ...props,
                    data: item.routes,
                    parentName: locale
                });
                result.children = children;
            }
            return result;
        });

};

const defaultFilterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] => {
    return menuData
        .filter((item => item && item.name && !item.hideInMenu))
        .map(item => {
            if (
                item.children &&
                Array.isArray(item.children) &&
                !item.hideChildrenInMenu &&
                item.children.some(child => child && !!child.name)
            ) {
                const children = defaultFilterMenuData(item.children);
                if (children.length) {
                    return {...item, children};
                }
            }
            return {...item, children: undefined};
        }).filter(item => item);
};

const getMenuData = (routes: Route[], menu?: {locale: boolean}) => {
    let orginalMenuData = formatter({
        data: routes,
        menu: menu || {locale: false}
    });
    console.log(orginalMenuData);
    const menuData = defaultFilterMenuData(orginalMenuData);
    return {menuData};
};

export default getMenuData;

