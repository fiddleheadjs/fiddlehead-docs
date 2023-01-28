# Fiddlehead

_A lightweight library to build user interfaces with JSX and hooks._

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?logo=github)](https://github.com/fiddleheadjs/fiddlehead/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/fiddlehead.svg?color=green&logo=npm)](https://www.npmjs.com/package/fiddlehead) [![bundle size](https://img.shields.io/github/size/fiddleheadjs/fiddlehead/lib/core/esm.production.min.js?color=green)](https://github.com/fiddleheadjs/fiddlehead/blob/master/lib/core/esm.production.min.js)

Fiddlehead is a UI library that allows you to develop web apps in the declarative style,
component-based - these make your lines of code more predictable and maintainable.

If you are familiar with React before, using Fiddlehead is quite similar.
It implements some of the main ideas of React: virtual DOM, functional components, and hooks.

Writing codes with Fiddlehead is nothing but JSX and hooks.
It is aimed to be as simple as possible, while still providing an excellent development experience.
With such criteria in mind, we made it some benefits:
- Simple usage: only JSX and hooks
- Performant: use only 50% memory, and slightly better CPU usage compared to React
- Lightweight: only 8kb (or 3kb gzipped), compared to 132kb for React

## Try it now

<playground>

```jsx
/** filename="App.js" */

import {useState} from 'fiddlehead';
import {Button} from './Button';

export default function App() {
  let [count, setCount] = useState(0);

  return (
    <>
      <h4>Count: {count}</h4>
      <Button
        title="Increase"
        onClick={() => setCount(count + 1)}
      />
      <Button
        title="Decrease"
        onClick={() => setCount(count - 1)}
      />
    </>
  );
}
```

```jsx
/** filename="Button/index.js" */

import './index.css';

export function Button({title, onClick}) {

  return (
    <button
      class="Button"
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
```

```css
/** filename="Button/index.css" */

.Button {
  padding: 6px 8px;
  border: 1px solid #AAA;
  border-radius: 3px;
  margin: 2px;
  background: #FFF;
  cursor: pointer;
}

.Button:hover {
  border-color: #888;
  background: #EEE;
}

.Button:active {
  background: #DDD;
}
```

</playground>

## Compare with React

### Performance

Benchmark test: https://github.com/fiddleheadjs/fiddlehead/tree/master/bench#the-table-test

| Criteria | Fiddlehead | React    | Vanila |
| ---------| ---------- | -------- | ------ |
| File size | 9.5 KB | 140 KB | 2.6 KB
| Gzipped size | 3.6 KB | 45 KB | 1.0 KB |
| Scripting | 1312 ms | 1637 ms | 934 ms |
| Rendering | 3162 ms | 3100 ms | 3601 ms |
| Heap memory | 8.8 MB - 82.1 MB | 9.8 MB - 152 MB | 2.0 MB - 6.2 MB |
| Persistent memory | 16.2 MB | 23 MB | 9.1 MB |

### Features

| Features | Fiddlehead | React |
| --- | ---------- | ----- |
| Functional components | YES | YES |
| Hooks | YES | YES |
| State management | Store API | Context API |
| HTML/SVG attributes | Close to native DOM | Modified for consistency |
| Forwarding ref | Handle as a normal property | Use `forwardRef()` |
| Synthetic events | _ | YES |
| Class components | _ | YES |
