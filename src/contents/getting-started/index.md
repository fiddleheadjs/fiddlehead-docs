# Getting started

**CCAD UI is the UI Kit of Cốc Cốc Ad Platform,
which provides React components and useful APIs that help you quickly develop a new UI project.
It is now available on [Gitlab](https://git.itim.vn/ads-management/ui-bootstrap), you can install it as a Git submodule.**

## Git submodule

Add CCAD UI to your project, let's say we want to save it inside the folder `path/to/ccad-ui`:

```git
git submodule add git@git.itim.vn:ads-management/ui-bootstrap.git path/to/ccad-ui
git submodule init
```

**Important:** Always update the submodule after switch to another branch:

```git
git submodule update

# If this is the first time you clone the project,
# or the first time your project using CCAD UI
git submodule update --init
```

## Dependencies

### Peer dependencies
```json
{
    "core-js": "^3.15.2",
    "dompurify": "^2.3.1",
    "moment": "^2.24.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
}
```

### Dev dependencies
```json
{
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@babel/preset-react": "^7.9.4",
    "babel-loader": "^8.1.0",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "css-loader": "3.3.0",
    "css-tree": "^1.1.3",
    "less": "^3.11.1",
    "less-loader": "^5.0.0",
    "style-loader": "^1.1.4",
    "webfont": "^11.2.26",
    "webpack": "^4.43.0"
}
```

## Webpack

### Basic configuration

```js
const path = require('path');
const webpack = require('webpack');

const publicPath = '/assets/bundles/'; // Where webpack can request your bundles from browser
const outputPath = path.resolve('path/to/bundles'); // Where webpack save your bundles
const ccadUiPath = path.resolve('path/to/ccad-ui'); // Where you place the CCAD UI submodule

function getJsLoaders() {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ],
                plugins: [
                    "transform-class-properties",
                    
                    // babel-plugin-react-classname is required by CCAD UI
                    path.resolve(ccadUiPath, 'webpack/babel-plugin-react-classname')
                ]
            }
        }
    ];
}

function getLessLoaders() {
    // Webpack loaders run from bottom up
    return [
        'style-loader',
        'css-loader?{"url":false}',

        // css-classname-loader work on raw CSS
        // Run this loader after less-loader to get it works
        path.resolve(ccadUiPath, 'webpack/css-classname-loader'),
        'less-loader',

        // icon-font-loader relies on a comment as the placeholder to put some font CSS
        // Run this loader first to make sure that comment was not deleted by other loaders
        {
            loader: path.resolve(ccadUiPath, 'webpack/icon-font-loader'),
            options: {
                outputPath: outputPath,
                publicPath: publicPath,
            }
        },
    ];
}

module.exports =  {
    mode: 'development',
    context: __dirname,
    entry: {
        'your-output-filename': [
            'core-js/stable', // Polyfill JS features to support old browsers 
            path.resolve('path/to/entry/index.js')
        ],
    },
    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: `[name].${ext}`,
        chunkFilename: `[name].chunk.${ext}`,
    },
    resolve: {
        alias: {
            // Customize CCAD UI with your own theme
            '@ccad-ui-preferences': path.resolve('path/to/preferences')
        }
    },
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
        ],
    },
    plugins: [
        // Ignore moment locale to reduce bundle size
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
};
```

### Advanced configuration

CCAD UI supports you to modularize your CSS with some different options: prefix, global class, module class prefix, module hash class.

Firstly, let's change the above functions to receive argument `classnameOptions`:

```js
function getJsLoaders(classnameOptions) {
    return [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"
                ],
                plugins: [
                    "transform-class-properties",
                    [
                        path.resolve(ccadUiPath, 'webpack/babel-plugin-react-classname'),
                        classnameOptions,
                    ]
                ]
            }
        }
    ];
}

function getLessLoaders(classnameOptions) {
    return [
        'style-loader',
        'css-loader?{"url":false}',
        {
            loader: path.resolve(ccadUiPath, 'webpack/css-classname-loader'),
            options: classnameOptions,
        },
        'less-loader',
        {
            loader: path.resolve(ccadUiPath, 'webpack/icon-font-loader'),
            options: {
                outputPath: outputPath,
                publicPath: publicPath,
            }
        }
    ];
}
```

Let's say we have a source code and want to transform it using `classnameOptions`:

```jsx
// Source
<div className="TextInput multiple-lines"></div>
```


#### Use case 1: Prefix all classes

We might want to prefix all classes come from CCAD UI to split it from the main project classes.
You can achieve this by specifying a `classPrefix`:

```js
const classnameOptions = {
    classPrefix: 'ccad-'
};
```

```jsx
// Output
<div className="ccad-TextInput ccad-multiple-lines"></div>
```

#### Use case 2: Global class

In this case, you do not want to prefix all classes, because you want to refer the original classes
but still want to keep your CSS not be polluted by CCAD UI.
Then option `globalClass` will be the choice: 

```js
const classnameOptions = {
    globalClass: 'ccad-ui'
};
```

```jsx
// Output
<div className="TextInput multiple-lines ccad-ui"></div>
```

#### Use case 3: Module class prefix

CCAD UI considers class names start with an uppercase alphabet letter is the module class names.
In this case you only want to prefix the module class names to distinguish with your own modules.

```js
const classnameOptions = {
    moduleClassPrefix: 'Ccad'
};
```

```jsx
// Output
<div className="CcadTextInput multiple-lines"></div>
```

#### Use case 4: Module hash classes

```js
const classnameOptions = {
    moduleHashClassPrefix: 'ccad-'
};
```

```jsx
// Dropdown.js
<div className="Dropdown">
    <div className="inner"/>
</div>

// AjaxSelect.js
<div className="AjaxSelect">
    <Dropdown/>
</div>

// Output
<div className="Dropdown ccad-0">
    <div className="inner ccad-0"/>
</div>

<div className="AjaxSelect ccad-1">
    <div className="Dropdown ccad-0">
        <div className="inner ccad-0"/>
    </div>
</div>
```

When you write CSS, you can "mention" to other module classes, but not regular classes

```less
.AjaxSelect {
    .Dropdown {
        // This rule will works
        
        .inner {
            // This rule will NOT works
        }
    }
}

// Output
.AjaxSelect.ccad-1 {
    .Dropdown {
        // A module class will not be "stickied" with the hash
        
        .inner.ccad-1 {
            // A regular class is "stickied" with the hash of the context module
        }
    }
}
``` 

*Continue...*
