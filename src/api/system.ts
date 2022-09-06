import {request} from '@/utils';

export const login = async (data: API.LoginParam, options?: {[key: string]: any}) => {
    return request.post('/api/login/account', data, options || {});
};

export const currentUser = async (options?: {[key: string]: any}) => {
    return request.get('/api/currentUser', options || {});
};

export const outLogin = (options?: {[key: string]: any}) => {
    return request.post('/api/login/outLogin', null, options);
};
