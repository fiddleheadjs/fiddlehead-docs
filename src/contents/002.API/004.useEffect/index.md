# useEffect

> Do side-effect tasks after the browser paints the output of the rendering process.

One of the most important hooks in Fiddlehead is the useEffect hook, which allows you to manage side effects in your components.

The useEffect hook is identical to the useEffect hook in React, and it works by letting you tell Fiddlehead how to manage and update your component based on changes to its state. This hook is used to perform tasks such as setting up a subscription or making an API call, and it is run whenever the component is rendered or when the component's state changes.

Using the useEffect hook is simple, and it takes two arguments: a callback function and a dependency array. The callback function contains the code you want to run when the component is rendered or its state changes, and the dependency array is an optional array of values that, when changed, will trigger the hook to re-run.

Here's an example of how you might use the useEffect hook in a component:

<playground>

```jsx
/** filename="ExampleComponent.js" */
import {useState, useEffect} from 'fiddlehead';

export default function ExampleComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count is ${count}`);
  }, [count]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

```

</playground>

In this example, the useEffect hook is used to log the current value of count to the console whenever count changes. Note that the second argument to useEffect is the dependency array, which in this case is `[count]`. This means that the hook will only re-run when count changes.

## Subscribe to external events

<playground>

```jsx
/** filename="PointerTracking.js" */
import {useEffect, useState} from 'fiddlehead';

export default function PointerTracking() {
  let [clientX, setClientX] = useState(0);
  let [clientY, setClientY] = useState(0);

  useEffect(() => {
    let onMouseMove = (event) => {
      setClientX(event.clientX);
      setClientY(event.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      // Cleanup when the component unmounts
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div>
      Pointer position: {clientX} ; {clientY}
    </div>
  );
}
```

</playground>

The useEffect hook takes in a function that runs when the component is mounted or updated and sets up an event listener on the window object to listen for mousemove events. This event listener updates the state of the component (clientX and clientY) with the current mouse position every time the mouse moves.

The hook also returns a cleanup function, which is executed when the component unmounts. In this case, the cleanup function removes the event listener from the window object to prevent memory leaks.
