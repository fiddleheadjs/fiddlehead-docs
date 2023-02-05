# Fiddlehead

> A lightweight library to build user interfaces with JSX and hooks.

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?logo=github)](https://github.com/fiddleheadjs/fiddlehead/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/fiddlehead.svg?color=green&logo=npm)](https://www.npmjs.com/package/fiddlehead) [![bundle size](https://img.shields.io/github/size/fiddleheadjs/fiddlehead/lib/core/esm.production.min.js?color=green)](https://github.com/fiddleheadjs/fiddlehead/blob/master/lib/core/esm.production.min.js)

Welcome to the world of Fiddlehead, a UI library for building dynamic and stunning web applications. With its focus on simplicity, performance, and ease of use, Fiddlehead is quickly becoming a popular choice for web developers around the world.

Fiddlehead is designed to make web development more accessible, with a user-friendly interface and a clear and concise syntax. Whether you're a seasoned web developer or just starting out, Fiddlehead is the perfect tool to help you bring your ideas to life.

At its core, Fiddlehead is built around the concept of components, allowing developers to break down complex applications into smaller, more manageable parts. And with the power of hooks, Fiddlehead makes it easy to add functionality and interactivity to your components.

What sets Fiddlehead apart from other UI libraries is its lightweight and performant design. At only 8kb (or 3kb gzipped), Fiddlehead uses significantly less memory and CPU than other popular libraries, making it an excellent choice for projects where size and performance are important.

We're excited to share the power of Fiddlehead with you, and we've put together this comprehensive documentation site to help you get started. Whether you're building your first web application or looking to take your skills to the next level, we're here to help. So dive in, and start building with Fiddlehead today!

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
| Error boundary | `useCatch` hook | `componentDidCatch` and `getDerivedStateFromError` lifecycle methods |
| Forwarding ref | Just handle `ref` as a normal property | Use `forwardRef` HOC |
| Synthetic events | _ | YES |
| Class components | _ | YES |
