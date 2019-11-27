
export interface MenuDataItem {
    authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: string;
    locale?: string;
    name?: string;
    path: string;
    [key: string]: any;
}

export interface Route extends MenuDataItem{
    routes?: Route[]
}

export interface MessageDescriptor {
    id: any;
    description?: string;
    defaultMessage?: string;
}
