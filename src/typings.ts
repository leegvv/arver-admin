import * as H from 'history';
import {RouterProps as BasicRouteProps} from 'react-router-dom';
import React from 'react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
    to: string;
    replace?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
}

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
    routes: Route[]
}

export type WithFalse<T> = T | false;

export interface RouterTypes<P> extends Omit<BasicRouteProps, 'location'> {
    route?: Route;
    location: BasicRouteProps['location'] | {pathname?: string}
}

export interface MessageDescriptor {
    id: any;
    description?: string;
    defaultMessage?: string;
}
