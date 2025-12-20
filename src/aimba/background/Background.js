import './Background.less';
import {useState} from 'fiddlehead';

export let Background = ({image, imageSet, imageSizes, lazy}) => {
    let [loaded, setLoaded] = useState(false);
    let [failed, setFailed] = useState(false);

    return (
        <div class={`Background ${loaded ? 'loaded' : ''} ${failed ? 'failed' : ''}`}>
            <layer-lower />
            <img
                src={image}
                srcSet={imageSet}
                sizes={imageSizes}
                alt="background"
                aria-hidden="true"
                loading={lazy ? 'lazy' : null}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
            />
            <layer-upper />
        </div>
    );
};
