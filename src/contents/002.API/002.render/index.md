# render

> Render your app into an HTML element.

```jsx
import {render} from 'fiddlehead';

// Declare your component
function HelloWorld() {
  return <h1>Hello World!</h1>;
}

// Render your component into a DOM element (#root)
render(<HelloWorld/>, document.getElementById('root'));
```
