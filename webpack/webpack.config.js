let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {getJsLoaders, getLessLoaders, getMarkdownLoaders, getLsLoaders} = require('./loaders.config');
let pkg = require('../package.json');

let configs = [];
let isDev = process.env.NODE_ENV !== 'production';
let rootDir = path.resolve(__dirname, '..');
let entriesDir = path.resolve(rootDir, 'src/entries');

fs.readdirSync(entriesDir).map(filename => {
    let extension = path.extname(filename);
    let fname = filename.substring(0, filename.length - extension.length);
    
    let title = pkg.description;
    let content = fs.readFileSync(path.resolve(entriesDir, filename), 'utf-8');
    if (content.startsWith('//')) {
        title = content.split('\n', 1)[0].substring(2).trim();
    }

    configs.push({
        mode: isDev ? 'development' : 'production',
        entry: path.resolve(entriesDir, filename),
        output: {
            path: path.resolve(rootDir, 'public/assets'),
            filename: filename
        },
        target: ['web', 'es5'],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: getJsLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
                {
                    test: /\.less$/,
                    use: getLessLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
                {
                    test: /\.md$/,
                    use: getMarkdownLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
                {
                    test: /\.ls$/,
                    use: getLsLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: isDev
            }),
            new HtmlWebpackPlugin({
                title: title,
                template: path.resolve(rootDir, 'src/template.html'),
                filename: path.resolve(rootDir, `dist/${fname}.html`),
                publicPath: '/assets/',
            }),
        ],
        resolve: {
            alias: {
                '@contents': path.resolve(rootDir, 'src/contents')
            }
        }
    });
});

module.exports = configs;
