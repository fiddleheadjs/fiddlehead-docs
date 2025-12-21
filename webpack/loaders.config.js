let path = require('path');
let autoprefixer = require('autoprefixer');
let postcssInitial = require('postcss-initial');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getJsLoaders({ classnameOptions }) {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    'babel-preset-fiddlehead',
                ],
                plugins: [
                    classnameOptions && [
                        path.resolve(__dirname, 'bundling/css-classname/babel-plugin-jsx-classname'),
                        classnameOptions
                    ],
                ].filter(Boolean)
            }
        }
    ];
}

function getLessLoaders({ classnameOptions }) {
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
        // css-classname-loader work on raw CSS
        // Run this loader after less-loader to get it works
        classnameOptions && {
            loader: path.resolve(__dirname, 'bundling/css-classname/webpack-css-classname-loader'),
            options: classnameOptions
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
