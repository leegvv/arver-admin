import {request} from '@/utils';

export async function getFakeCaptcha(params: {phone?: string}, options?:{[key: string]: any}) {
    return request.get('/api/login/captcha', {params: {...params}});
}
