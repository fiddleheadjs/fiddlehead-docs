import './Loading.less';
import {useEffect, useState} from 'fiddlehead';
import {__} from '../../modules/i18n';
import {Spinner} from '../spinner/Spinner';

export let Loading = () => {
    let [opacity, setOpacity] = useState(0);

    useEffect(() => {
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
            <span>{__('Loading...')}</span>
            <Spinner />
        </div>
    );
};
