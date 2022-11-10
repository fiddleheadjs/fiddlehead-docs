# useMemo

_This hook is used to avoid re-running a heavy calculation every time the component re-renders._

```jsx
import {useMemo} from 'fiddlehead';

function App() {
    let result = useMemo(() => {
        // Run heavy tasks
        return result;
    }, []);

    // ...
}
```
