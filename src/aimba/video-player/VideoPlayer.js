import './VideoPlayer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {Aspect} from '../aspect';
import {useClickAwayListener} from '../click-away';
import {Play} from '../icons';

export let VideoPlayer = ({ src, poster, active }) => {
    let rootRef = useRef(null);
    let videoRef = useRef(null);
    let [rendersVideo, setRendersVideo] = useState(false);
    let [inViewPort, setInViewPort] = useState(false);
    let [controls, setControls] = useState(false);
    let [ongoing, setOngoing] = useState(false);
    
    useClickAwayListener(rootRef, () => {
        setControls(false);
    });
    
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
        let root = rootRef.current;
        if (root == null) {
            return;
        }
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(({ intersectionRatio }) => {
                if (intersectionRatio > 0) {
                    setRendersVideo(true);
                }
                setInViewPort(intersectionRatio >= 0.8);
            });
        }, {
            threshold: [0.01, 0.8]
        });
        observer.observe(root);
        return () => {
            observer.unobserve(root);
        };
    }, []);

    return (
        <div
            ref={rootRef}
            class="VideoPlayer"
            onMouseEnter={() => {
                setControls(true);
            }}
            onClick={() => {
                setControls(true);
            }}
        >
            <Aspect>
                <img
                    src={poster}
                    alt="video poster"
                    loading="lazy"
                    aria-hidden="true"
                />
                {rendersVideo && (
                    <video
                        ref={videoRef}
                        controls={controls}
                        playsinline
                        tabIndex="0"
                        onPlaying={() => {
                            setOngoing(true);
                        }}
                        onEnded={() => {
                            setOngoing(false);
                        }}
                    >
                        <source src={src} poster={poster} />
                    </video>
                )}
                {!controls && !ongoing && (
                    <div class="overlay">
                        <Play />
                    </div>
                )}
            </Aspect>
        </div>
    );
};
