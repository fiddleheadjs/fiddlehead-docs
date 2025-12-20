let path = require('path');
let autoprefixer = require('autoprefixer');
let postcssInitial = require('postcss-initial');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getJsLoaders() {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    'babel-preset-fiddlehead',
                ]
            }
        }
    ];
}

function getLessLoaders() {
    return [
        // Use css extract instead of style-loader
        MiniCssExtractPlugin.loader,
        // {
        //     loader: 'style-loader',
        //     options: {
        //         injectType: 'singletonStyleTag',
        //     }
        // },
        {
            loader: 'css-loader',
            options: {
                url: false,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        autoprefixer(),
                        postcssInitial({reset: 'inherited'}),
                    ]
                }
            }
        },
        'less-loader',
    ].filter(Boolean);
}

function getMarkdownLoaders() {
    return [
        path.resolve(__dirname, 'custom-loaders/markdown')
    ];
}

function getHtmlLoaders() {
    return [
        path.resolve(__dirname, 'custom-loaders/html')
    ];
}

function getScandirLoaders() {
    return [
        path.resolve(__dirname, 'custom-loaders/scandir')
    ];
}

module.exports = {
    getJsLoaders,
    getLessLoaders,
    getMarkdownLoaders,
    getHtmlLoaders,
    getScandirLoaders,
};
