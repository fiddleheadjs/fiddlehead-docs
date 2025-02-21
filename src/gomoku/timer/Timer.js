import './Timer.less';
import {useEffect, useState} from 'fiddlehead';
import {cancelInterval, scheduleInterval} from '../utils';

export let Timer = ({isFirstMove, moveDuration, makeMoveRandomly}) => {
    let firstMoveDuration = moveDuration + 30;
    let duration = isFirstMove ? firstMoveDuration : moveDuration;

    let [remainingTime, setRemainingTime] = useState(duration * 1000);
    let tick = remainingTime >= 5000 ? 1000 : 100;

    useEffect(() => {
        let intervalId = scheduleInterval(() => {
            setRemainingTime(time => time - tick);
        }, tick);
        
        return () => {
            cancelInterval(intervalId);
        };
    }, [tick]);

    let timeOutBuffer = 200;
    let isTimeOutAlready = remainingTime + timeOutBuffer <= 0;

    useEffect(() => {
        if (isTimeOutAlready) {
            makeMoveRandomly();
        }
    }, [isTimeOutAlready, makeMoveRandomly]);

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
