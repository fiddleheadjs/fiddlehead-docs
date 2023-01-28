# useState

_Manage state of your components._

## Basic usage

<playground>

```jsx
/** filename="Counter.js" */

import {useState} from 'fiddlehead';

export default function Counter() {
    let [count, setCount] = useState(0);
    
    return (
        <>
            <h2>Count: {count}</h2>
            {new Array(count).fill(1).map((_, index) => <p>Row {index}.</p>)}
            <button
                onClick={() => {
                    setCount(count + 1);
                    console.log('count', count);
                }}
            >
                Add row
            </button>
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
