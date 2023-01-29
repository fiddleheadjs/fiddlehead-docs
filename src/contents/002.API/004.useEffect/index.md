# useEffect

_Do side-effect tasks after the browser paints the output of the rendering process._

<playground>

```jsx
/** filename="PointerTracking.js" */
import {useEffect, useState} from 'fiddlehead';

export default function PointerTracking() {
  let [clientX, setClientX] = useState(0);
  let [clientY, setClientY] = useState(0);

  useEffect(() => {
    let onMouseMove = (event) => {
      setClientX(event.clientX);
      setClientY(event.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      // Cleanup when the component unmounts
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div>
      Pointer position: {clientX} ; {clientY}
    </div>
  );
}
```

</playground>
