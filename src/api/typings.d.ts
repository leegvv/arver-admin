declare namespace API {

    type CurrentUser = {
        name?: string;
        avatar?: string;
        userid?: string;
        email?: string;
        signature?: string;
        title?: string;
        group?: string;
        tags?: {key?: string; label?: string}[];
        notifyCount?: number;
        unreadCount?: number;
        country?: string;
        access?: string;
        geographic?: {
            province? : {label?: string; key?: string};
            city?: {label?: sring; key?: string};
        };
        address?: string;
        phone?: string;
    };

    type LoginParam = {
        username?: string;
        password?: string;
        autoLogin?: boolean;
        type?: string;
    };

    type LoginResult = {
        status?: string;
        type?: string;
        currentAuthority?: string;
    };

    type PageParams = {
        current?: number;
        pageSize?: number;
    };

    type FakeCaptcha = {
        code?: number;
        status?: string;
    };
}