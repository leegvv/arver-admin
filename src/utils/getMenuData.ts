import {MenuDataItem, Route} from '@/typings';
interface FormatterProps {
    data: MenuDataItem[]
}

const formatter = (props: FormatterProps): MenuDataItem[] => {
    const {data = []} = props;
    return data.filter(item => item && item.name && item.path)
        .map((item = {path: ''}) => {
            if (!item.name) {
                return item;
            }
            const result: MenuDataItem = {
                ...item,
                routes: null
            };
            if (item.routes) {
                const children = formatter({
                    data: item.routes
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

const getMenuData = (routes: Route[]) => {
    let orginalMenuData = formatter({data: routes});
    console.log(orginalMenuData);
    const menuData = defaultFilterMenuData(orginalMenuData);
    return {menuData};
};

export default getMenuData;

