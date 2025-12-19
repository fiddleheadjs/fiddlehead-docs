let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let {getJsLoaders, getLessLoaders, getMarkdownLoaders, getScandirLoaders, getHtmlLoaders} = require('./loaders.config');
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

    let metadata = {};
    while (content.startsWith('//')) {
        let firstLine = content.split('\n', 1)[0];
        content = content.substring(firstLine.length).trim();
        let metaName = firstLine.substring(2).split(':', 1)[0];
        let metaValue = firstLine.substring(3 + metaName.length);
        metaName = metaName.trim();
        metaValue = metaValue.trim();
        metadata[metaName] = metaValue;
    }
    let {
        lang = 'en',
        title = pkg.title,
        description = pkg.title,
        themeColor = 'white',
    } = metadata;

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
                    use: getLessLoaders(isDev)
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
                lang,
                title,
                description,
                themeColor,
                template: path.resolve(rootDir, 'src/template.ejs'),
                filename: path.resolve(rootDir, `dist/${fname}.html`),
                publicPath: '/assets/',
            }),
            !isDev && new MiniCssExtractPlugin(),
        ].filter(Boolean),
        resolve: {
            alias: {
                '@contents': path.resolve(rootDir, 'src/contents'),

                // Use these special aliases when debugging Fiddlehead:
                // A trailing $ can also be added to the given object's keys to signify an exact match:
                // 'fiddlehead$': path.resolve(rootDir, '../fiddlehead/lib/core'),
                // 'fiddlehead/store$': path.resolve(rootDir, '../fiddlehead/lib/store'),
            }
        }
    });
});

module.exports = configs;
