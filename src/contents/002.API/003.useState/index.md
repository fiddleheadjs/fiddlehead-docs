# useState

> The useState API is used to manage state, so that your component can respond to user interactions and other events.

State is a data structure that holds information about a component and can change over time. The useState API is used to manage the state of a component. It is called with an initial value and returns an array with two values: the current state value, and a setter function that can be used to update the state value. The state value can be any JavaScript value, including objects and arrays.

## Adding state to a component

Here's a simple example that demonstrates how to use the useState API in FiddleheadJS:

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

In FiddleheadJS, state updates are done in batches, meaning that multiple updates made within the same render cycle will be combined into a single update. This can help optimize the performance of your app, as the virtual DOM will only need to be reconciled once per render cycle, instead of multiple times.

Here's an example to illustrate the concept of batching state updates in FiddleheadJS:

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

In conclusion, the useState API in FiddleheadJS provides a simple and efficient way to add state to functional components, just like the useState hook in React. By using the useState API, you can manage state in a clean and organized manner.
