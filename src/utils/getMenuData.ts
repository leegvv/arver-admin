import {MenuDataItem, Route, MessageDescriptor} from '@/typings';
import {Settings} from 'src/config/defaultSettings'

interface FormatterProps {
    data: MenuDataItem[];
    menu: Settings['menu'];
    formatMessage?: (data:{id: string, defaultMessage?: string}) => string;
    parentName?: string;
}

const formatter = (props: FormatterProps): MenuDataItem[] => {
    const {data = [], menu, formatMessage, parentName} = props;
    return data.filter(item => item && item.name && item.path)
        .map((item = {path: ''}) => {
            const {name} = item;
            if (!name) {
                return item;
            }
            const locale = `${parentName || 'menu'}.${name}`;
            const localeName =
                menu.locale || !formatMessage
                    ? name
                    : formatMessage({ id: locale, defaultMessage: name });

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

const getMenuData = (routes: Route[], menu?: {locale: boolean}, formatMessage?: (message: MessageDescriptor) => string) => {
    let orginalMenuData = formatter({
        data: routes,
        formatMessage,
        menu: menu || {locale: false}
    });
    console.log(orginalMenuData);
    const menuData = defaultFilterMenuData(orginalMenuData);
    return {menuData};
};

export default getMenuData;

