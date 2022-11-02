# Getting Started

**Setup your workspace to start coding with Fiddlehead.**

## Installation

Install Fiddlehead

```bash
npm install fiddlehead
```

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
