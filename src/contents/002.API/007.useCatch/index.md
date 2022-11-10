# useCatch

_This is used to create error boundaries._

You may want your application to handle unexpected errors in runtime, then show a user-friendly message instead of a blank screen, while reporting errors to a logging service in the background.

To support that purpose, Fiddlehead provides you useCatch hook. useCatch catches errors during rendering, in hook callbacks, and in the whole subtree below. useCatch does not catch errors in event listeners, AJAX handlers,...

The component implements useCatch hook works as an error boundary. Each error boundary allows only one useCatch inside.

```jsx
import {useCatch} from 'fiddlehead';

function ErrorBoundary({children}) {
    let [error, clearError] = useCatch();

    if (error !== null) {
        return 'Oops... Something went wrong!';
    }

    return children;
}
```
