# useState

_Manage state of your components._

## States

Any function component can hold one or more states.

<playground>

```jsx
/** filename="Counter.js" */

import {useState} from 'fiddlehead';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>Count: {count}</h2>
      {new Array(count).fill(1).map((_, index) => (
        <p>Row {index}.</p>
      ))}
      <p>
        <button
          onClick={() => {
            setCount(count + 1);
            console.log('count', count);
          }}
        >
          Add row
        </button>
        {' '}
        {count > 0 && (
          <button
            onClick={() => {
              setCount(count - 1);
              console.log('count', count);
            }}
          >
            Delete row
          </button>
        )}
      </p>
    </>
  );
}
```

</playground>

## State updates are done in batches

Fiddlehead batches updates to optimize number of renders.
When you call multiple state updates at the same time,
the component will only re-render once to apply all updated states.

<playground>

```jsx
/** filename="Batching.js" */

import {useState} from 'fiddlehead';

export default function Batching() {
  const [age, setAge] = useState(20);

  const increment = () => {
    console.count('increment');
    setAge(x => x + 1);
  };

  console.count('render');

  return (
    <>
      <h1>Age: {age}</h1>
      <button
        onClick={() => {
          increment();
          increment();
          increment();
        }}
      >
        Increase (+3)
      </button>
    </>
  );
}
```

</playground>
