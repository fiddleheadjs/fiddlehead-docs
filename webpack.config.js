const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {getJsLoaders, getLessLoaders, getMarkdownLoaders} = require('./loaders');

const configs = [];

const isDev = process.env.NODE_ENV !== 'production';

fs.readdirSync('./src/pages').map(pathname => {
    const extension = path.extname(pathname);  
    const basename = path.basename(pathname);
    const filename = basename.substring(0, basename.length - extension.length);

    configs.push({
        mode: isDev ? 'development' : 'production',
        entry: `./src/pages/${filename}.js`,
        output: {
            path: path.resolve(__dirname, 'public/assets'),
            filename: `${filename}.js`
        },
        target: ['web', 'es5'],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: getJsLoaders()
                },
                {
                    test: /\.less$/,
                    use: getLessLoaders()
                },
                {
                    test: /\.md$/,
                    use: getMarkdownLoaders()
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: isDev
            }),
            new HtmlWebpackPlugin({
                title: filename,
                filename: `../${filename}.html`,
                template: './src/template.html'
            }),
        ],
    });
});

module.exports = configs;
