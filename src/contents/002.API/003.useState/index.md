# useState

_Manage state of your components._

<playground>

```jsx
/** filename="Counter.js" */

import {useState} from 'fiddlehead';

export default function Counter() {
    let [count, setCount] = useState(0);
    
    return (
        <>
            <h2>Count: {count}</h2>
            <br/>
            <button
                onClick={() => {
                    setCount(count + 1);
                    console.log('count', count);
                }}
            >
                Increase
            </button>
        </>
    );
}
```

</playground>

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
