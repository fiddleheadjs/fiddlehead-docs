import './VideoPlayer.less';
import {useEffect, useRef, useState} from 'fiddlehead';
import {Aspect} from '../aspect';
import {useClickAwayListener, useIntersectionObserver} from '../utils';
import {Play} from '../icons';

export let VideoPlayer = ({src, poster, muted, active, rendersContent}) => {
    let rootRef = useRef(null);
    let targetRef = useRef(null);
    let [rendersVideo, setRendersVideo] = useState(false);
    let [inViewport, setInViewport] = useState(false);
    let [controls, setControls] = useState(false);
    let [ongoing, setOngoing] = useState(false);

    useClickAwayListener(rootRef, () => {
        setControls(false);
    });

    useEffect(() => {
        let target = targetRef.current;
        if (target == null) {
            return;
        }
        let video = target instanceof HTMLVideoElement ? target : null;
        let iframe = target instanceof HTMLIFrameElement ? target : null;
        if (active && inViewport) {
            video?.play();
            iframe?.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":[]}',
                'https://www.youtube.com/'
            );
        } else {
            video?.pause();
            iframe?.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":[]}',
                'https://www.youtube.com/'
            );
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

    let fromYoutube = src.startsWith('https://www.youtube.com/');
    let showsCover = !controls && !ongoing && !fromYoutube;

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
                {rendersContent && rendersVideo && !fromYoutube && (
                    <video
                        ref={targetRef}
                        controls={controls}
                        playsinline
                        muted={muted}
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
                {rendersContent && rendersVideo && fromYoutube && (
                    <iframe
                        ref={targetRef}
                        src={src}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    />
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
