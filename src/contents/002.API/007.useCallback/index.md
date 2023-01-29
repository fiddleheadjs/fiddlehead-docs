# useCallback

_It keeps the instance of a function through renders._

When you pass an inline function to a child component, that child component will always re-render when the current component re-renders, because the inline function is always a different instance.

Wrapping that function with the useCallback hook helps you access the existing instance instead of using the new instance of the function, thereby, the child component will not re-render unintentionally.

In the following example, whenever the App component re-renders, the Form component also re-renders following unintentionally, because the function passed to onSubmit prop always is a different function.

```jsx
import {useState} from 'fiddlehead';

function App() {
  let handleSubmit = () => {
    // ...
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  );
}

function Form({onSubmit}) {
  // ...
}
```

Wrap the inline function within useCallback to avoid re-rendering:

```jsx
import {useState, useCallback} from 'fiddlehead';

function App() {
  let handleSubmit = useCallback(() => {
    // ...
  }, []);

  // ...
}
```
