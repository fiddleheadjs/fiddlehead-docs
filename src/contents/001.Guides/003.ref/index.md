# ref

_Some notes about `ref` in Fiddlehead._

### Forwarding refs

Different from React, Fiddlehead does not prevent you from using `ref` as a normal prop.
You are free to choose the name of the prop which forwards the ref.
As you pass that prop to a built-in element, it requires you to provide an instance of Ref,
which you will get by using the `createRef` function or `useRef` hook.

```jsx
import {useRef} from 'fiddlehead';

function TextInput({ref}) {
    return (
        <input ref={ref}/>
    );
}

function App() {
    let inputRef = useRef(null);
    
    useEffect(() => {
        console.log('Input element', inputRef.current);
    }, []);

    return (
        <TextInput ref={inputRef}/>
    );
}
```
