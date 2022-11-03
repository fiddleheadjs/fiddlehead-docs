let path = require('path');
let autoprefixer = require('autoprefixer');
let postcssInitial = require('postcss-initial');

function getJsLoaders() {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                ],
                plugins: [
                    ['prismjs', {
                        languages: ['markup', 'jsx', 'json', 'css', 'bash'],
                        plugins: ['line-highlight', 'line-numbers'],
                        theme: 'default',
                        css: true,
                    }],
                    ['@babel/plugin-transform-react-jsx', {
                        pragma: 'jsx',
                        pragmaFrag: "'['",
                    }],
                    ['babel-plugin-auto-import', {
                        declarations: [{
                            members: ['jsx'],
                            path: 'fiddlehead',
                        }]
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

function getLsLoaders() {
    return [
        path.resolve(__dirname, 'custom-loaders/ls')
    ];
}

module.exports = {
    getJsLoaders,
    getLessLoaders,
    getCssLoaders,
    getMarkdownLoaders,
    getLsLoaders,
};
