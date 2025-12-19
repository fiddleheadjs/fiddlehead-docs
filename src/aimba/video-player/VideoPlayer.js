import {useEffect, useRef, useState} from 'fiddlehead';
import {Aspect} from '../aspect';
import './VideoPlayer.less';

export let VideoPlayer = ({ src, poster, active }) => {
    let videoRef = useRef(null);
    let [inViewPort, setInViewPort] = useState(false);
    let [controls, setControls] = useState(false);

    useEffect(() => {
        let video = videoRef.current;
        if (video == null) {
            return;
        }
        if (active && inViewPort) {
            video.play();
        } else {
            video.pause();
        }
    }, [active, inViewPort]);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        let video = videoRef.current;
        if (video == null) {
            return;
        }
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                setInViewPort(entry.isIntersecting);
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        });
        observer.observe(video);
        return () => {
            observer.unobserve(video);
        };
    }, []);

    let showControls = () => setControls(true);

    let hideControls = () => setControls(false);

    return (
        <div
            class="VideoPlayer"
            onMouseEnter={showControls}
            onMouseLeave={hideControls}
        >
            <Aspect>
                <img
                    src={poster}
                    alt="Video poster"
                    loading="lazy"
                    aria-hidden="true"
                />
                <video controls={controls} ref={videoRef} autoplay={active} muted playsinline>
                    <source
                        src={src}
                        poster={poster}
                    />
                </video>
            </Aspect>
        </div>
    );
};
