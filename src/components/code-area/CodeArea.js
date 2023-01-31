import './CodeArea.less';
import {useState, useEffect, useCallback, useRef} from 'fiddlehead';
import {Mask} from './Mask';
import {BreathRing} from '../breath-ring/BreathRing';

export let CodeArea = ({defaultValue, onChange, onLoadingStateChange, language}) => {
    // CodeMirror is heavy, so we load it only when the user want to edit
    // Before that, we use Prism as a "mask"
    // Actually, Prism highlights codes in more details and is faster (of course),
    // so we always use it first, even when the CodeMirror is already loaded.
    let Mirror = useRef(null);
    
    let [defaultSelection, setDefaultSelection] = useState(null);

    // We want to use the scroll feature supported by CodeMirror
    // Using a scroller to wrap both Mirror and Mask also works,
    // but leads to a "paint" error in Safari 14 for iOS.
    // This ref is used to transfer the scroll position from Mask to Mirror
    let defaultScrollPosition = useRef([0, 0]);

    let [isLoadingMirror, setIsLoadingMirror] = useState(false);
    let [mirrorLoadingError, setMirrorLoadingError] = useState(null);
    
    let [focused, setFocused] = useState(false);
    let [touched, setTouched] = useState(false);
    
    let [showsMask, setShowsMask] = useState(Mirror.current === null || defaultSelection === null);
    let [showsMirror, setShowsMirror] = useState(!showsMask);
    let [showsScrollbar, setShowsScrollbar] = useState(false);

    useEffect(() => {
        // Make little delay so that the loading indicator
        // will not display if the internet connection is fast.
        // Once the indicator displays, it also should not hide too quickly
        let timeoutId = setTimeout(() => {
            onLoadingStateChange({
                inProgress: isLoadingMirror,
                error: mirrorLoadingError
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [isLoadingMirror, mirrorLoadingError]);

    useEffect(() => {
        if (defaultSelection === null || isLoadingMirror || Mirror.current !== null) {
            return;
        }

        setMirrorLoadingError(null);
        setIsLoadingMirror(true);

        import('./Mirror').then((exports) => {
            Mirror.current = exports.Mirror;
            setShowsMirror(true);
        }).catch((error) => {
            setMirrorLoadingError(error.message);
        }).finally(() => {
            setIsLoadingMirror(false);
        });
    }, [defaultSelection]);

    useEffect(() => {
        // Wait a moment so the layout does not bounce
        let timeoutId = setTimeout(() => {
            setShowsMask(!showsMirror);
        }, 10);

        return () => clearTimeout(timeoutId);
    }, [showsMirror]);

    useEffect(() => {
        if (focused || touched) {
            setShowsScrollbar(true);
            return;
        }

        let timeoutId = setTimeout(() => {
            setShowsScrollbar(false);

            // Delay a moment to hide the scrollbar
            // The scrolling can continue after the user swipes due to inertia simulation
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [touched || focused]);

    let handleMaskScroll = useCallback((event) => {
        defaultScrollPosition.current = [
            event.target.scrollLeft,
            event.target.scrollTop,
        ];
    }, []);

    return (
        <div
            class={`CodeArea${focused ? ' focused' : ''}${!showsScrollbar ? ' scrollbar-hidden' : ''}`}
            onTouchStart={() => setTouched(true)}
            onTouchEnd={() => setTouched(false)}
            onMouseEnter={() => setTouched(true)}
            onMouseLeave={() => setTouched(false)}
        >
            {showsMask && (
                <div
                    style={showsMirror ? {
                        opacity: 0.1,
                        pointerEvents: 'none',
                    } : null}
                >
                    <Mask
                        content={defaultValue}
                        onSelectionChange={setDefaultSelection}
                        onFocusChange={setFocused}
                        onScroll={handleMaskScroll}
                        language={language}
                    />
                </div>
            )}
            {showsMirror && (
                <div
                    style={showsMask ? {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    } : null}
                >
                    <Mirror.current
                        defaultValue={defaultValue}
                        defaultSelection={defaultSelection}
                        defaultScrollPosition={defaultScrollPosition.current}
                        onChange={onChange}
                        onFocusChange={setFocused}
                        language={language}
                    />
                </div>
            )}
            {focused && showsMask && !showsMirror && (
                <BreathRing />
            )}
        </div>
    );
};
