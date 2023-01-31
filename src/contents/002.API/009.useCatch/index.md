# useCatch

> This is used to create error boundaries.

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
    <>
      <h1>Title</h1>
      <ErrorBoundary>
        <Post />
      </ErrorBoundary>
    </>
  );
}
```

```jsx
/** filename="Post.js" */
import {useEffect} from 'fiddlehead';

export function Post() {
  useEffect(() => {
    let badCode = 'const a;';
    eval(badCode);
  }, []);

  return <div>Post Content</div>;
}
```

```jsx
/** filename="ErrorBoundary.js" open */
import {useCatch} from 'fiddlehead';

export function ErrorBoundary({children}) {
  let [error, clearError] = useCatch();

  if (error !== null) {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}`;
    }

    return 'Oops... Something went wrong!';
  }

  return children;
}
```

</playground>
