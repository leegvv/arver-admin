import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

type ResultWithData<T=any> = {data?: T; [key: string]: any};

interface RequestConfig extends AxiosRequestConfig {
    skipErrorHandler?: boolean;
    requestInterceptors?: RequestInterceptorTuple[];
    responseIntereptors?: ResponseInterceptorTuple[];
    [key: string]: any;
}
interface RequestConfigWithResponse extends RequestConfig {
    getResponse: true;
}

interface RequestConfigWithoutResponse extends RequestConfig {
    getResponse: false;
}

type RequestInterceptor = (config: RequestConfig) => RequestConfig;
type ErrorInterceptor = (error: Error) => Promise<Error>;
type ResponseInterceptor = <T = any>(response: AxiosResponse<T>) => AxiosResponse<T>;
type RequestInterceptorTuple = [RequestInterceptor, ErrorInterceptor] | [RequestInterceptor] | RequestInterceptor;
type ResponseInterceptorTuple = [RequestInterceptor, ErrorInterceptor] | [ResponseInterceptor] | ResponseInterceptor;

interface Request {

}

const axiosInstance = axios.create({
    timeout: 10000
});

const request = (url: string, opts: any={method: 'GET'}) => {
    const {getResponse = false} = opts;
    return new Promise((resolve, reject) => {
        axiosInstance
            .request({...opts, url})
            .then((res) => {
                resolve(getResponse ? res : res.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export {request};
