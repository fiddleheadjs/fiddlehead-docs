import './Loading.less';
import {useEffect, useState} from 'fiddlehead';
import {__} from '../../modules/i18n';
import {Spinner} from '../spinner/Spinner';

export let Loading = ({label = __('Loading...')}) => {
    let [opacity, setOpacity] = useState(0);

    useEffect(() => {
        // Make little delay so that the loading indicator
        // will not display if the internet connection is fast.
        // Once the indicator displays, it also should not hide too quickly
        let timeoutId = setTimeout(() => {
            setOpacity(1);
        }, 200);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            class="Loading"
            style={{opacity, transition: 'opacity 800ms'}}
        >
            <span>{label}</span>
            <Spinner />
        </div>
    );
};
