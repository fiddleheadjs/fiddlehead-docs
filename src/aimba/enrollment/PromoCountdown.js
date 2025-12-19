import './PromoCountdown.less';
import {useEffect, useState} from 'fiddlehead';

const HOUR_MILLIS = 60 * 60 * 1000;
const MINUTE_MILLIS = 60 * 1000;
const SECOND_MILLIS = 1000;

let pad = (number) => {
    if (number < 10) {
        return `0${number}`;
    }

    return `${number}`;
};

let getRemainTime = () => {
    let now = new Date();

    let endTime = new Date();
    endTime.setHours(23, 59, 59, 999);

    return endTime.getTime() - now.getTime();
};

let getClockValues = (remainTime) => {
    let hours = Math.floor(remainTime / HOUR_MILLIS);
    remainTime = remainTime - hours * HOUR_MILLIS;

    let minutes = Math.floor(remainTime / MINUTE_MILLIS);
    remainTime = remainTime - minutes * MINUTE_MILLIS;

    let seconds = Math.floor(remainTime / SECOND_MILLIS);

    return [
        pad(hours),
        pad(minutes),
        pad(seconds)
    ];
};

export let PromoCountdown = () => {
    let [remainTime, setRemainTime] = useState(() => getRemainTime());

    useEffect(() => {
        let intervalId = setInterval(() => {
            setRemainTime(getRemainTime());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    let [hours, minutes, seconds] = getClockValues(remainTime);

    return (
        <div class="PromoCountdown">
            <b class="hv">{hours}</b> <i class="hu">Giờ</i>
            <b class="mv">{minutes}</b> <i class="mu">Phút</i>
            <b class="sv">{seconds}</b> <i class="su">Giây</i>
        </div>
    );
};
