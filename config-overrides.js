const {override, fixBabelImports, addLessLoader, addWebpackAlias, overrideDevServer} = require('customize-cra');
const {primaryColor} = require('./src/defaultSettings');
const path = require('path');
const mockServer = require('./mock/server')

const addMockServer = () => config => {
    config.after = (app)=> {mockServer(app)};
    config.historyApiFallback = true;
    return config;
};

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {'@primary-color': primaryColor},
            localIdentName: '[path][name]__[local]'
        }),
        addWebpackAlias({
            '@': path.resolve(__dirname, 'src')
        })
    ),
    devServer: overrideDevServer(addMockServer())
};