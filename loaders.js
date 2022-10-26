const autoprefixer = require('autoprefixer');
const postcssInitial = require('postcss-initial');

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
                        'languages': ['markup', 'jsx', 'json', 'css', 'bash'],
                        'theme': 'default',
                        'css': true,
                    }],
                    ['@babel/plugin-transform-react-jsx', {
                        'pragma': 'jsx',
                        'pragmaFrag': "'['",
                    }],
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

function getMarkdownLoaders() {
    return [
        path.resolve(__dirname, 'markdown/loader.js')
    ];
}

module.exports = {
    getJsLoaders,
    getLessLoaders,
    getMarkdownLoaders,
};
