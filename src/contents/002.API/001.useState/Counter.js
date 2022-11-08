import {useState} from 'fiddlehead';
import {Button} from '@components/button/Button';

export default function Counter({console}) {
    let [count, setCount] = useState(0);
    
    return (
        <div>
            <h2>Count: {count}</h2>
            <br/>
            <Button
                onClick={() => {
                    setCount(count + 1);
                    console.log('count', count);
                }}
            >
                Increase
            </Button>
        </div>
    );
}
