# /store

_This package allows you to share global state everywhere in your application._

Store is a separated package. It is helpful when you want to use some global states, which can be read/written from anywhere in the DOM tree, with no need to pass props through all levels of elements.

Let's checkout this example:

```jsx
import {useStoreInit, useStoreRead, useStoreWrite} from 'fiddlehead/store';

function App() {
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
            onChange={ev => setTitle(ev.target.value)}
        />
    );
}
```
