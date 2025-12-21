let path = require('path');
let fs = require('fs');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
let HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
let HtmlInlineCssPlugin = require("html-inline-css-webpack-plugin").default;
let {getJsLoaders, getLessLoaders, getMarkdownLoaders, getScandirLoaders, getHtmlLoaders} = require('./loaders.config');
let pkg = require('../package.json');

let configs = [];
let isProd = process.env.NODE_ENV === 'production';
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
        headAppend1,
        headAppend2,
        cssClassPrefix
    } = metadata;

    let inlinesOptions = [(isProd ? 'prod' : 'dev'), '*'];
    let inlinesJs = inlinesOptions.includes(metadata.inlinesJs);
    let inlinesCss = inlinesOptions.includes(metadata.inlinesCss);

    let classnameOptions = cssClassPrefix && {
        classPrefix: cssClassPrefix
    };

    configs.push({
        mode: isProd ? 'production' : 'development',
        devtool: 'cheap-module-source-map',
        entry: {
            [fname]: path.resolve(entriesDir, filename)
        },
        output: {
            path: path.resolve(rootDir, 'public/assets')
        },
        target: ['web', 'es5'],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: getJsLoaders({classnameOptions})
                },
                {
                    test: /\.less$/,
                    use: getLessLoaders({classnameOptions})
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
                __DEV__: !isProd,
                __srcFiddlehead__: JSON.stringify(srcFiddlehead),
                __srcFiddleheadStore__: JSON.stringify(srcFiddleheadStore),
            }),
            new HtmlWebpackPlugin({
                lang,
                title,
                description,
                themeColor,
                headAppends: [headAppend1, headAppend2],
                template: path.resolve(rootDir, 'src/template.ejs'),
                filename: path.resolve(rootDir, `dist/${fname}.html`),
                publicPath: '/assets/',
                minify: false, // Do not minify html,
                inject: inlinesJs ? 'body' : 'head',
                scriptLoading: inlinesJs ? 'blocking' : 'defer',
            }),
            new MiniCssExtractPlugin(),
            inlinesJs && new HtmlInlineScriptPlugin(),
            inlinesCss && new HtmlInlineCssPlugin(),
        ].filter(Boolean),
        resolve: {
            alias: {
                '@contents': path.resolve(rootDir, 'src/contents'),

                // Use these special aliases when debugging Fiddlehead:
                // A trailing $ can also be added to the given object's keys to signify an exact match:
                // 'fiddlehead$': path.resolve(rootDir, '../fiddlehead/lib/core'),
                // 'fiddlehead/store$': path.resolve(rootDir, '../fiddlehead/lib/store'),
            }
        },
        optimization: {
            minimizer: [
                // For webpack@5 you can use the '...' syntax to extend existing minimizers (i.e. 'terser-webpack-plugin').
                '...',
                new CssMinimizerPlugin(),
            ],
        },
    });
});

module.exports = configs;
