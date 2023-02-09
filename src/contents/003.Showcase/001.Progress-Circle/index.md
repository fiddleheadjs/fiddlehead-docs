# Progress Circle

> Create progress circles using SVG

## Countdown circle

<playground>

```jsx
/** filename="App.js" */

import './App.css';
import {useState, useEffect} from 'fiddlehead';
import {Circle} from './Circle';

export default function App() {
    let totalMillis = 100000;
    let [millis, setMillis] = useState(totalMillis);

    useEffect(() => {
        let step = 10;
        let intervalId = setInterval(() => {
            setMillis(millis => {
                if (millis > 0) {
                    return millis - step;
                }
                clearInterval(intervalId);
                return millis;
            });
        }, step);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div class="App">
            <Circle
                percentage={100 * (totalMillis - millis) / totalMillis}
                dimension={80}
                strokeWidth={4}
            />
            <code>{Math.ceil(millis / 1000)}</code>
        </div>
    );
}
```

```css
/** filename="App.css" */

.App {
    display: flex;
    align-items: center;
    justify-content: center;
}

.App code {
    position: absolute;
    margin: auto;
    font-size: 24px;
}
```

```jsx
/** filename="Circle.js" open */

export function Circle({percentage, dimension, strokeWidth}) {
    let diameter = dimension - strokeWidth;
    let radius = diameter / 2;
    let perimeter = diameter * Math.PI;

    // Start the arc from the top offset instead of right offset
    let arcOffset = perimeter / 4;
    let arcLength = perimeter * percentage / 100;

    return (
        <svg
            viewBox={`0 0 ${dimension} ${dimension}`}
            width={`${dimension}px`}
            height={`${dimension}px`}
        >
            <circle
                fill="none"
                stroke="currentColor"
                cx={radius + strokeWidth / 2}
                cy={radius + strokeWidth / 2}
                r={radius}
                stroke-width={strokeWidth}
                stroke-dashoffset={arcOffset}
                stroke-dasharray={`${arcLength} ${perimeter - arcLength}`}
                stroke-linecap="round"
            />
        </svg>
    );
}
```

</playground>
