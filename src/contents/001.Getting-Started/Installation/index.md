# Setup project

_Setup your project workspace to start coding with Fiddlehead._

## Installation

### Fiddlehead

```bash
npm install fiddlehead
```

### JSX syntax

Though this is optional, we highly recommend you to use it. We all love it!

First step, install some Babel packages:

```bash
npm install -D babel-preset-fiddlehead
```

Next step, let's create a Babel config file:

`.babelrc`

```json
{
    "presets": ["babel-preset-fiddlehead"]
}
```

### Build tool

In this instruction, we choose Webpack, but you also can use other build tools which support Babel transformers.

```bash
npm install -D webpack webpack-cli babel-loader
```

Next step, config Webpack to accept the Babel config we created above.

`webpack.config.js`

```js
// data-line="10-17"
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './foo.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'foo.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
            }
        ],
    },
};
```

In the configuration above, we inherit from the [Webpack introductory configuration](https://webpack.js.org/concepts/configuration/#introductory-configuration), and adding the `module` block to support JSX syntax.


Now, you can start coding:

```js
import {jsx, render} from 'fiddlehead';

function MyApp() {
    return jsx(
        'h1',
        {class: 'my-app'},
        'Hello world!'
    );
}

render(
    jsx(MyApp, null),
    document.getElementById('root')
);
```

Fiddlehead transforms your JavaScript codes into DOM nodes and display them on the screen, via `jsx` function.

Thanks to JSX syntax, the code above can be written as:

```jsx
import {render} from 'fiddlehead';

function MyApp() {
    return <div class="my-app">Hello world!</div>;
}

render(<App/>, document.getElementById('root'));
```

It is much better!

Fiddlehead can work without JSX syntax, but we highly recommend you to try it.
Firstly, we need to install some babel packages to transform JSX codes in to JS codes:

```bash
npm install --save-dev \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    @babel/plugin-transform-react-jsx \
    babel-plugin-auto-import
```

Let's create a babel config file:

`.babelrc`

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/plugin-transform-react-jsx", {
            "pragma": "jsx",
            "pragmaFrag": "'['"
        }],
        ["babel-plugin-auto-import", {
            "declarations": [{
                "members": ["jsx"],
                "path": "fiddlehead"
            }]
        }]
    ]
}
```

Then, setup JSX loaders in your webpack config:

`webpack.config.js`

```js
module.exports = {
    //...
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader']
            },
            //...
        ],
    },
};
```

_Note: We made an assumption that you are using webpack to build your codes.
You also can use other bundling tools to use JSX syntax, if they support Babel loaders._

## Next step
