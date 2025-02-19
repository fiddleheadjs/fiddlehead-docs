import {useState} from 'fiddlehead';
import './Timer.less';

export let Timer = ({ makeMoveRandomly }) => {
    let [remainingTime, setRemainingTime] = useState(10000);

    useEffect(() => {
        if (remainingTime <= 0) {
            makeMoveRandomly();
            return;
        }
        
        let timeoutId = setTimeout(() => {
            setRemainingTime(remainingTime - 100);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [remainingTime]);

    return (
        <div class="Timer">
            {remainingTime / 1000}s
        </div>
    );
};
