import './Timer.less';
import {useEffect, useState} from 'fiddlehead';

export let Timer = ({ isFirstMove, moveDuration, makeMoveRandomly }) => {
    let firstMoveDuration = moveDuration + 30;
    let duration = isFirstMove ? firstMoveDuration : moveDuration;
    
    let [remainingTime, setRemainingTime] = useState(duration * 1000);

    useEffect(() => {
        let zeroWithBuffer = -200;
        if (remainingTime <= zeroWithBuffer) {
            makeMoveRandomly();
            return;
        }
        
        let tick = 100;
        let timeoutId = setTimeout(() => {
            setRemainingTime(remainingTime - tick);
        }, tick);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [remainingTime, makeMoveRandomly]);

    let isComfortable = remainingTime > moveDuration * 1000;
    let isSensitive = !isComfortable && remainingTime < 3500;

    return (
        <span class={`Timer ${isComfortable ? 'comfortable' : ''} ${isSensitive ? 'sensitive' : ''}`}>
            {remainingTime >= 0 && (
                isSensitive ? (remainingTime / 1000).toFixed(1) : Math.ceil(remainingTime / 1000)
            )}
        </span>
    );
};
