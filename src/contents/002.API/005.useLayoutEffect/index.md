# useLayoutEffect

> Do side-effect tasks after the component rendering process, but before the browser has chance to paint.

Use this hook to read and modify the DOM synchronously before it is handled by the browser to translate to pixels on the screen.
Because tasks scheduled inside `useLayoutEffect` will be flushed asynchronously, they will block the main process.
It is best practice to always try with `useEffect` first and only use `useLayoutEffect` in case the UI has noticeable transitions.
