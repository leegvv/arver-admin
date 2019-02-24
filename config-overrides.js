const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const { primaryColor } = require('./src/defaultSettings');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': primaryColor},
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
    }),
);