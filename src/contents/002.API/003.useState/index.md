# useState

> The useState API is used to manage state, so that your component can respond to user interactions and other events.

State is a data structure that holds information about a component and can change over time. The useState API is used to manage the state of a component. It is called with an initial value and returns an array with two values: the current state value, and a setter function that can be used to update the state value. The state value can be any JavaScript value, including objects and arrays.

## Adding state to a component

Here's a simple example that demonstrates how to use the useState API in Fiddlehead:

<playground>

```jsx
/** filename="Counter.js" */
import {render, useState} from 'fiddlehead';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

</playground>

In this example, we're using the useState API to manage the count state of our component. The useState API takes an initial value as its argument, and returns an array containing the current state and a function to update the state. In our example, we're using destructuring to extract the count value and the setCount function from the array.

The count value is displayed in the component using curly braces {}. We're using the setCount function to update the count state when the button is clicked. The setCount function takes the new state value as its argument and updates the count state.

Here's another example that demonstrates how to use the useState API with an object:

<playground>

```jsx
/** filename="Form.js" */
import {render, useState} from 'fiddlehead';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <>
      <form>
        <input
            type="text"
            name="name"
            value={formData.name}
            onInput={handleChange}
        />
        <input
            type="email"
            name="email"
            value={formData.email}
            onInput={handleChange}
        />
      </form>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </>
  );
}
```

</playground>

In this example, we're using the useState API to manage the formData state of our component. The formData state is an object that holds the values of the form inputs. We're using the setFormData function to update the formData state when the inputs are changed. The setFormData function takes the new state value as its argument and updates the formData state.

## Providing an initializer

The useState API also accepts an initializer function as its first argument. This function is used to compute the initial value of the state, and it will be called only once when the component is first rendered. This can be useful when the initial value of the state depends on some external data or other state values. The following example demonstrates this:

<playground>

```jsx
/** filename="MyComponent.js" */
import {useState} from 'fiddlehead';

export default function MyComponent() {
  const [count, setCount] = useState(() => {
    return window.localStorage.getItem('count') || 0;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

</playground>

In this example, we use the initializer function to fetch the count value from localStorage and return it as the initial value of the state. If there is no value stored in localStorage, we return 0 as the default value. This allows us to persist the state of the component across multiple sessions, even if the user refreshes the page or closes the browser.

## Batching state updates

In Fiddlehead, state updates are done in batches, meaning that multiple updates made within the same render cycle will be combined into a single update. This can help optimize the performance of your app, as the virtual DOM will only need to be reconciled once per render cycle, instead of multiple times.

Here's an example to illustrate the concept of batching state updates in Fiddlehead:

<playground>

```jsx
/** filename="Batching.js" */
import {useState} from 'fiddlehead';

export default function Batching() {
  const [count, setCount] = useState(20);

  const increment = () => {
    console.count('increment');
    setCount(x => x + 1);
  };

  console.count('render');

  return (
    <>
      <h1>Count: {count}</h1>
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

In this example, the state is a count value, and the function to update the state is setCount.

The component begins by calling useState with an initial value of 20, which means that the count state will start at 20. The setCount function is used to update the count state, and it takes a new value as an argument. In this example, the setCount function is called three times in the increment function, which is called when the button is clicked.

The increment function increases the count state by one each time it is called, and it does this by calling setCount with an updater function that takes the previous value and returns the new value. In this case, the updater function simply adds 1 to the previous value.

The component then displays the count state and a button that, when clicked, calls the increment function three times. When the button is clicked, the count state will be increased by three, and the component will re-render to display the new value.

In the console, you can see that render is logged each time the component is re-rendered, and increment is logged each time the increment function is called. This demonstrates that the component is only re-rendered once, even though the increment function is called three times, because Fiddlehead batches updates to the state to minimize the number of re-renders.
