let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {getJsLoaders, getLessLoaders, getMarkdownLoaders} = require('./loaders.config');
let pkg = require('../package.json');

let configs = [];
let isDev = process.env.NODE_ENV !== 'production';
let rootDir = path.resolve(__dirname, '..');

fs.readdirSync(path.resolve(rootDir, 'src/pages')).map(pathname => {
    let extension = path.extname(pathname);  
    let basename = path.basename(pathname);
    let filename = basename.substring(0, basename.length - extension.length);
    
    let title = pkg.description;
    let content = fs.readFileSync(
        path.resolve(rootDir, `src/pages/${pathname}`),
        {encoding: 'utf-8'}
    );
    if (content.startsWith('//')) {
        title = content.split(/\r\n|\n|\r/, 1)[0].substring(2).trim();
    }

    configs.push({
        mode: isDev ? 'development' : 'production',
        entry: path.resolve(rootDir, `src/pages/${filename}.js`),
        output: {
            path: path.resolve(rootDir, 'public/assets'),
            filename: `${filename}.js`
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
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: isDev
            }),
            new HtmlWebpackPlugin({
                title: title,
                template: path.resolve(rootDir, 'src/template.html'),
                filename: path.resolve(rootDir, `dist/${filename}.html`),
                publicPath: '/assets/',
            }),
        ],
    });
});

module.exports = configs;
