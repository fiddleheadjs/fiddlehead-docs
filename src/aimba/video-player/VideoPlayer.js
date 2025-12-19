import './VideoPlayer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {Aspect} from '../aspect';
import {useClickAwayListener} from '../use-click-away-listener';

export let VideoPlayer = ({ src, poster, active }) => {
    let rootRef = useRef(null);
    let videoRef = useRef(null);
    let [inViewPort, setInViewPort] = useState(false);
    let [controls, setControls] = useState(false);
    let showControls = () => setControls(true);
    let hideControls = () => setControls(false);
    
    useClickAwayListener(rootRef, hideControls);
    
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

    return (
        <div
            ref={rootRef}
            class="VideoPlayer"
            onMouseEnter={showControls}
            onClick={showControls}
        >
            <Aspect>
                <img
                    src={poster}
                    alt="Video poster"
                    loading="lazy"
                    aria-hidden="true"
                />
                <video
                    ref={videoRef}
                    controls={controls}
                    autoplay={active}
                    playsinline
                    muted
                    tabIndex="0"
                >
                    <source
                        src={src}
                        poster={poster}
                    />
                </video>
            </Aspect>
        </div>
    );
};
