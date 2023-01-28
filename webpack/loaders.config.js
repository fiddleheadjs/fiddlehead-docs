let path = require('path');
let autoprefixer = require('autoprefixer');
let postcssInitial = require('postcss-initial');

function getJsLoaders() {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    'babel-preset-fiddlehead',
                ],
                plugins: [
                    ['prismjs', {
                        languages: ['markup', 'jsx', 'json', 'css', 'bash'],
                        theme: 'default',
                        css: false,
                    }]
                ],
            }
        }
    ];
}

function getLessLoaders() {
    return [
        {
            loader: 'style-loader',
            options: {
                injectType: 'singletonStyleTag',
            }
        },
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
    ];
}

function getCssLoaders() {
    return [
        'style-loader',
        {
            loader: 'css-loader',
            options: {
                url: false,
            }
        },
    ];
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
    getCssLoaders,
    getMarkdownLoaders,
    getHtmlLoaders,
    getScandirLoaders,
};
