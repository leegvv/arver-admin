const CracoLessPlugin = require('craco-less');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const fs = require('fs');
const lessToJs = require('less-vars-to-js');

const genModifyVars = () => {
    const modifyVars = {};
    const readAntdCustomizeLess = (filename) => {
        if (!fs.existsSync(filename)) {
            return false;
        }
        return fs.readFileSync(filename, 'utf8');
    };

    const antdCustomVarsLess = readAntdCustomizeLess(`.${path.sep}antd.customize.less`);

    if (antdCustomVarsLess) {
        const antdCustomVars = lessToJs(antdCustomVarsLess);
        Object.assign(modifyVars, antdCustomVars);
    }
    return modifyVars;
};

const modifyVars = genModifyVars();

module.exports = {
    babel: {
        plugins: [
            //第一个 style 为 true ,需要配置 craco-less一起才能生效
            ['import', {libraryName: 'antd', style: true}],
            //第二种 style 为css ,不需要 craco-less
            // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }],
            ['@babel/plugin-proposal-decorators', {legacy: true}]
        ]
    },
    devServer: (devServerConfig, {proxy}) => {
        /*devServerConfig.before = (app) => {
            devServerBefore(app);
        };*/
        devServerConfig.proxy = {
            ...proxy,
            '/api/': {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        };
        return devServerConfig;
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: modifyVars,
                        javascriptEnabled: true
                    }
                }
            }
        },
        {
            plugin: AntdDayjsWebpackPlugin
        }
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins: {
            add: [
                new StylelintPlugin({
                    extensions: ['css', 'less'],
                    files: '**/*.(less|css)'
                })
            ]
        }
    }
};