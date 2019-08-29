const {override, fixBabelImports,addDecoratorsLegacy, addLessLoader, addWebpackAlias, overrideDevServer} = require('customize-cra');
const {primaryColor} = require('./defaultSettings');
const path = require('path');
const mockServer = require('./mock/server')

const addMockServer = () => config => {
    config.after = (app)=> {mockServer(app)};
    return config;
};

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        addDecoratorsLegacy(),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {'@primary-color': primaryColor}
        }),
        addWebpackAlias({
            '@': path.resolve(__dirname, 'src')
        })
    ),
    devServer: overrideDevServer(addMockServer())
};
