import './Timer.less';
import {useEffect, useState} from 'fiddlehead';

export let Timer = ({ isFirstMove, moveDuration, makeMoveRandomly }) => {
    let firstMoveDuration = moveDuration + 30;
    let duration = isFirstMove ? firstMoveDuration : moveDuration;
    
    let [remainingTime, setRemainingTime] = useState(duration * 1000);

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
    }, [remainingTime, makeMoveRandomly]);

    let isComfortable = remainingTime > moveDuration * 1000;
    let isSensitive = !isComfortable && remainingTime < 3500;

    return (
        <span class={`Timer ${isComfortable ? 'comfortable' : ''} ${isSensitive ? 'sensitive' : ''}`}>
            {isSensitive ? (remainingTime / 1000).toFixed(1) : Math.ceil(remainingTime / 1000)}
        </span>
    );
};
