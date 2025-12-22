import './VideoPlayer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {Aspect} from '../aspect';
import {useClickAwayListener, useIntersectionObserver} from '../utils';
import {Play} from '../icons';

export let VideoPlayer = ({src, poster, active}) => {
    let rootRef = useRef(null);
    let videoRef = useRef(null);
    let [rendersVideo, setRendersVideo] = useState(false);
    let [inViewport, setInViewport] = useState(false);
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
        if (active && inViewport) {
            video.play();
        } else {
            video.pause();
        }
    }, [active, inViewport]);

    useIntersectionObserver(rootRef, {
        threshold: [0, 0.8],
        callback: ({intersectionRatio}) => {
            if (intersectionRatio > 0) {
                setRendersVideo(true);
            }
            setInViewport(intersectionRatio >= 0.8);
        }
    });

    let showsCover = !controls && !ongoing;

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
                {showsCover && (
                    <img
                        src={poster}
                        alt="video poster"
                        loading="lazy"
                    />
                )}
                {showsCover && (
                    <div class="overlay">
                        <Play />
                    </div>
                )}
            </Aspect>
        </div>
    );
};
