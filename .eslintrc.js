module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    globals: {
        page: true,
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-indent': 8,
        'react/jsx-indent-props': 8,
        'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
            },
        ],
        'import/no-cycle': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'linebreak-style': 0,
        'comma-spacing': ["error", { "before": false, "after": true }],
        'semi': ["error", "always"]
    },
    settings: {
        // support import modules from TypeScript files in JavaScript files
        'import/resolver': { node: { extensions: ['.js', '.ts', '.tsx'] } },
        polyfills: ['fetch', 'promises', 'url', 'object-assign'],
    },
};
