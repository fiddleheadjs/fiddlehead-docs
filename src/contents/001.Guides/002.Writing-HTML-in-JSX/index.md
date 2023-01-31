# Writing HTML in JSX

> Some notes when writing JSX to describe your UI with Fiddlehead.

### class and className

Fiddlehead supports both `class` and `className`, they are identity.

- Why `class`? It makes your code more like HTML
- Why `className`? It is an property of HTMLElement

```jsx
<div class="banner" />
// equals to
<div className="banner" />
```

### style

Unlike writing CSS in HTML, you need to pass an object with keys are style properties (camelCase),
instead of a string, to the `style` property.

```jsx
<div style={{
  marginTop: '100px',
  padding: '1em 2em',
  fontWeight: 'bold',
  zIndex: 100,
}} />
```

### innerHTML

You can set `innerHTML` normally as other properties.

**Warning:** There are potential security vulnerabilities when you set `innerHTML` by a user-entered text without encoding special characters.
Please make sure that you know what you do!

```jsx
<div innerHTML={markdown2html(content)} />
```

### Event listeners

Say, we want to do something when a user clicks on an element:

```jsx
let handleClick = (event) => {
  event.preventDefault();
  // ...
};
```

When we work with plain JavaScript, we can set an event listener like this:

```jsx
let link = document.createElement('a');
link.textContent = 'Homepage';
link.onclick = handleClick;
```

Setting an event listener in Fiddlehead is similar, except event names are written in camelCase style:

```jsx
<a onClick={handleClick}>
  Homepage
</a>
```
