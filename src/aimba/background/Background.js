import './Background.less';
import {useEffect, useRef, useState} from 'fiddlehead';

export let onePixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export let Background = ({image, lazy}) => {
    let rootRef = useRef(null);
    let [inViewport, setInViewport] = useState(false);
    let [loaded, setLoaded] = useState(false);
    let [failed, setFailed] = useState(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        let root = rootRef.current;
        if (root == null) {
            return;
        }
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(({ intersectionRatio, target }) => {
                let appliedThreshold;
                let t = target.offsetHeight;
                let w = window.innerHeight;
                if (t > 2 * w) {
                    appliedThreshold = 0.1;
                } else if (t > w) {
                    appliedThreshold = 0.3;  
                } else if (t > w / 2) {
                    appliedThreshold = 0.5;
                } else {
                    appliedThreshold = 0.7;
                }
                setInViewport(intersectionRatio >= appliedThreshold);
            });
        }, {
            threshold: [0.1, 0.3, 0.5, 0.7]
        });
        observer.observe(root);
        return () => {
            observer.unobserve(root);
        };
    }, []);

    let sources = image instanceof Array ? image : [[null, image]];

    return (
        <div
            ref={rootRef}
            class={[
                'Background',
                lazy && 'lazy',
                loaded && 'loaded',
                inViewport && 'in-viewport'
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
