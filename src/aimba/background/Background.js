import './Background.less';
import {useState} from 'fiddlehead';

export let onePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export let Background = ({image, lazy}) => {
    let [loaded, setLoaded] = useState(false);
    let [failed, setFailed] = useState(false);

    let sources = image instanceof Array ? image : [[null, image]];

    return (
        <div
            class={[
                'Background',
                lazy && 'lazy',
                loaded && 'loaded'
            ].filter(Boolean).join(' ')}
        >
            {failed || (
                <picture>
                    {sources.map(([media, srcSet]) => (
                        <source key={media} media={media} srcSet={srcSet} />
                    ))}
                    <img
                        src={onePixel}
                        alt="background"
                        aria-hidden="true"
                        loading={lazy ? 'lazy' : null}
                        onLoad={() => setLoaded(true)}
                        onError={() => setFailed(true)}
                    />
                </picture>
            )}
            <div class="filter" />
        </div>
    );
};
