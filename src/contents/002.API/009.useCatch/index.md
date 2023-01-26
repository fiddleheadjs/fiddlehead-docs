# useCatch

_This is used to create error boundaries._

You may want your application to handle unexpected errors in runtime, then show a user-friendly message instead of a blank screen, while reporting errors to a logging service in the background.

To support that purpose, Fiddlehead provides you `useCatch` hook. `useCatch` catches errors during rendering, in hook callbacks, and in the whole subtree below. It does not catch errors in event listeners, AJAX handlers,...

The component implements `useCatch` hook works as an error boundary. Each error boundary allows only one `useCatch` inside.

<playground>

```jsx
/** filename="App.js" */
import {ErrorBoundary} from './ErrorBoundary';
import {Post} from './Post';

export default function App() {
    return (
        <ErrorBoundary>
            <Post />
        </ErrorBoundary>
    );
}
```

```jsx
/** filename="Post.js" */
import {useEffect} from 'fiddlehead';

function Post() {
    useEffect(() => {
        let badCode = 'const a;';
        eval(badCode);
    }, []);

    return <div>post</div>;
}
```

```jsx
/** filename="ErrorBoundary.js" */
import {useCatch} from 'fiddlehead';

function ErrorBoundary({children}) {
    let [error, clearError] = useCatch();

    if (error !== null) {
        return 'Oops... Something went wrong!';
    }

    return children;
}
```

</playground>
