
export interface Settings {
    menu: {
        locale: boolean
    },
    theme: string,
    primaryColor: string,
    title: string,
    iconfontUrl: string
}

const defaultSettings: Settings = {
    menu: {
        locale: true,
    },
    theme: 'dark',
    primaryColor: '#1890FF',
    title: 'Ant Design Pro',

    // 注意：如果需要图标多色，Iconfont图标项目里要进行批量去色处理
    iconfontUrl: ''
};

export default defaultSettings;
