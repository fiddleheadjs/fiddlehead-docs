let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let {getJsLoaders, getLessLoaders, getMarkdownLoaders, getScandirLoaders, getCssLoaders, getHtmlLoaders} = require('./loaders.config');
let pkg = require('../package.json');

let configs = [];
let isDev = process.env.NODE_ENV !== 'production';
let rootDir = path.resolve(__dirname, '..');
let entriesDir = path.resolve(rootDir, 'src/entries');

let srcFiddlehead = fs.readFileSync(path.resolve(rootDir, 'node_modules/fiddlehead/lib/core/cjs.development.legacy.min.js'), 'utf-8');
let srcFiddleheadStore = fs.readFileSync(path.resolve(rootDir, 'node_modules/fiddlehead/lib/store/cjs.development.legacy.min.js'), 'utf-8');

fs.readdirSync(entriesDir).map(filename => {
    let extension = path.extname(filename);
    let fname = filename.substring(0, filename.length - extension.length);
    
    let content = fs.readFileSync(path.resolve(entriesDir, filename), 'utf-8');
    content = content.trim();

    let title = pkg.description;
    if (content.startsWith('//')) {
        let firstLine = content.split('\n', 1)[0];
        title = firstLine.substring(2).trim();
        content = content.substring(firstLine.length).trim();
    }

    let description = title;
    if (content.startsWith('//')) {
        let firstLine = content.split('\n', 1)[0];
        description = firstLine.substring(2).trim();
        content = content.substring(firstLine.length).trim();
    }

    configs.push({
        mode: isDev ? 'development' : 'production',
        devtool: 'cheap-module-source-map',
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
                    use: getJsLoaders()
                },
                {
                    test: /\.less$/,
                    use: getLessLoaders()
                },
                {
                    test: /\.css$/,
                    use: getCssLoaders(),
                },
                {
                    test: /\.md$/,
                    use: getMarkdownLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
                {
                    test: /\.html$/,
                    use: getHtmlLoaders(),
                },
                {
                    test: /\.scandir$/,
                    use: getScandirLoaders(),
                    exclude: /[\\/]node_modules[\\/]/
                },
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                __DEV__: isDev,
                __srcFiddlehead__: JSON.stringify(srcFiddlehead),
                __srcFiddleheadStore__: JSON.stringify(srcFiddleheadStore),
            }),
            new HtmlWebpackPlugin({
                title: title,
                description: description,
                template: path.resolve(rootDir, 'src/template.ejs'),
                filename: path.resolve(rootDir, `dist/${fname}.html`),
                publicPath: '/assets/',
            }),
        ],
        resolve: {
            alias: {
                '@contents': path.resolve(rootDir, 'src/contents'),

                // Use these special aliases when debugging Fiddlehead:
                // 'fiddlehead$': path.resolve(rootDir, '../fiddlehead/lib/core'),
                // 'fiddlehead/store$': path.resolve(rootDir, '../fiddlehead/lib/store'),
            }
        }
    });
});

module.exports = configs;
