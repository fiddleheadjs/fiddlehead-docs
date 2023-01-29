import './CodeArea.less';
import {useEffect, useState} from 'fiddlehead';
import {border_radius, color} from '../../style/theme';

const TRANSITION_MILLIS = 500;

export let InProgress = () => {
    let [peak, setPeak] = useState(false);

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            setPeak(peak => !peak);
        }, TRANSITION_MILLIS);

        return () => clearTimeout(timeoutId);
    }, [peak]);

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: `${border_radius.level_2}px`,
                boxShadow: `inset 0 0 0 1.5px ${color.primary}`,
                opacity: peak ? 1 : 0.15,
                transition: `opacity ${TRANSITION_MILLIS}ms`,
            }}
        />
    );
};
