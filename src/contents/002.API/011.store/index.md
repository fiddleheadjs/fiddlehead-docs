# /store

_This package allows you to share global state everywhere in your application._

Store is a separated package. It is helpful when you want to use some global states, which can be read/written from anywhere in the DOM tree, with no need to pass props through all levels of elements.

Let's checkout this example:

<playground>

```jsx
/** filename="App.js" */

import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

export default function App() {
    useStoreInit(
        App, // Scope, can be any reference-type value (object, function,...)
        {title: 'Store usage example'} // Initial data, a reference-type value
    );

    return (
        <main>
            <Header/>
            <section>
                <Form/>
            </section>
        </main>
    );
}

function Header() {
    let title = useStoreRead(
        App, // Scope
        (data) => data.title // Reader
    );

    return (
        <h1>{title}</h1>
    );
}

function Form() {
    let title = useStoreRead(App, (data) => data.title);
    let setTitle = useStoreWrite(
        App, // Scope
        (value, data) => data.title = value // Writer
    );

    return (
        <input
            type="text"
            value={title}
            onInput={ev => setTitle(ev.target.value)}
        />
    );
}
```

</playground>

In practice, you may want to provide your own APIs to access stores, instead of directly using the built-in hooks.

This is a refactor of the example above:

<playground>

```jsx
/** filename="App.js" */

import {useMetaInit} from './stores/meta';
import {Header} from './Header';
import {Form} from './Form';

export default function App() {
    useMetaInit();

    return (
        <main>
            <Header/>
            <section>
                <Form/>
            </section>
        </main>
    );
}
```

```jsx
/** filename="Header.js" */

import {useTitle} from './stores/meta';

export function Header() {
    let title = useTitle();

    return (
        <h1>{title}</h1>
    );
}
```

```jsx
/** filename="Form.js" */

import {useTitle, useSetTitle} from './stores/meta';

export function Form() {
    let title = useTitle();
    let setTitle = useSetTitle();

    return (
        <input
            type="text"
            value={title}
            onInput={event => setTitle(event.target.value)}
        />
    );
}
```

```js
/** filename="stores/meta.js" open */

import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

const scope = Object.create(null);

export function useMetaInit() {
    useStoreInit(scope, {
        title: 'Store usage example'
    });
}

export function useTitle() {
    return useStoreRead(scope, (data) => data.title);
}

export function useSetTitle() {
    return useStoreWrite(scope, (value, data) => data.title = value);
}
```

</playground>
