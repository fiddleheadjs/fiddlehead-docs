# Setup Project

_Setup your project workspace to start coding with Fiddlehead._

## Installation

### Fiddlehead

Install the latest version of Fiddlehead via NPM:

```bash
npm install fiddlehead
```

### JSX syntax

Though JSX is optional to build a Fiddlehead application, we highly recommend everyone to use it.

Install `babel-preset-fiddlehead` package which contains necessary Babel plugins and settings,
that enable JSX syntax with Fiddlehead integration ready:

```bash
npm install -D babel-preset-fiddlehead
```

The next step is configuring your project to recognize the Babel preset.
Almost build tools support Babel, it is up to you to choose one suit for your project.
In this instruction, we choose Webpack as it is the most popular one.

Install Webpack and Babel loader (for Webpack):

```bash
npm install -D webpack webpack-cli babel-loader
```

Create the Webpack configuration file:

```js
/** filename="webpack.config.js" data-line="12-20" */
let path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-fiddlehead'],
                    },
                },
            },
        ],
    },
};
```

Here we refer to the [Webpack introductory configuration](https://webpack.js.org/concepts/configuration/#introductory-configuration)
and add `babel-loader` to support JSX syntax.
If you get confused about Webpack loaders, checkout this [document](https://webpack.js.org/concepts/loaders/) for more information.

## Compile your code

Now, let's start with a tiny piece of code!

```jsx
/** filename="index.js" */
import {render} from 'fiddlehead';

function MyApp() {
    return <div class="my-app">Hello world!</div>;
}

render(<App/>, document.getElementById('root'));
```

There is a magic here: Writing HTML in JavaScript! We call it JSX.
When we build the project, `babel-loader` transforms JSX code to JavaScript code, which browsers can understand.

Run the `webpack` command at the root of your project to build your code:

```bash
webpack --config webpack.config.js
```

Your code will be transform to something like this:

```js
/** filename="dist/bundle.js" */
// This import line is not the real output, just for illustration
var {jsx, render} = require('fiddlehead');

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

In the runtime, Fiddlehead transforms the JavaScript code into DOM nodes and display them on the screen, via `jsx` and `render` function.

The `babel-preset-fiddlehead` preset will automatically import the `jsx` function.
This automation allows you to only import what is "visible" to you when writing code.
In other words, with this JSX is considered a "real" language, not a "shortcut" for a function.
