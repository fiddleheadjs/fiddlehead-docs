import {useState} from 'fiddlehead';
import {Button} from '@components/button/Button';

export default function Counter() {
    let [count, setCount] = useState(0);
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <br/>
            <Button
                type="button"
                onClick={() => {
                    setCount(count => count + 1);
                }}
            >
                Increase
            </Button>
        </div>
    );
}
