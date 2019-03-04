const path = require('path');

module.exports = () => { return {
    entry: {
        'form-plus': './standard.js',
        'form-plus-with-shims': './with-shims.js',
        'form-plus-register': './register.js',
        'form-plus-register-with-shims': './register-with-shims.js',
        'form-plus-test': './test.js',
    },
    stats: {
        children: false,
        modules: false,
        entrypoints: false,
        hash: false,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'FormPlus',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        }
                    }
                ]
            }
        ]
    },
}};