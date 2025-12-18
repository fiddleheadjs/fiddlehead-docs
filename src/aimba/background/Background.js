import './Background.less';
import {useState} from 'fiddlehead';

export let Background = ({image, lazy}) => {
    let [loaded, setLoaded] = useState(false);
    let [failed, setFailed] = useState(false);

    return (
        <div class={`Background ${loaded ? 'loaded' : ''} ${failed ? 'failed' : ''}`}>
            <img
                src={image}
                alt="background"
                aria-hidden="true"
                loading={lazy ? 'lazy' : null}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
            />
            <layer-one />
        </div>
    );
};
