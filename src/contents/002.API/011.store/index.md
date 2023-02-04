# /store

> This package allows you to share global state everywhere in your application.

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

The code example demonstrates the usage of store APIs in Fiddlehead, including useStoreInit, useStoreRead, and useStoreWrite.

The useStoreInit is used to initialize a store with a given scope and initial data. In this example, the store is scoped to the App component and is initialized with a single property title and its value is "Store usage example".

The useStoreRead hook is used to read the data from the store. The hook accepts two arguments: the scope of the store and a reader function that maps the data from the store to the component's state. In the Header component, the hook reads the title value from the store and displays it in an h1 tag.

The useStoreWrite hook is used to write data to the store. The hook also accepts two arguments: the scope of the store and a writer function that updates the data in the store. In the Form component, the hook reads the title value from the store and creates a setter to update it. The setter is then passed to an input field, so when the value of the input changes, the title value in the store also changes.

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
