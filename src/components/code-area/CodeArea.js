import './CodeArea.less';
import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';
import {InProgress} from './InProgress';

export let CodeArea = ({defaultValue, onChange, onLoadingStateChange, language}) => {    
    let Mirror = useRef(null);
    
    let [defaultSelection, setDefaultSelection] = useState(null);
    let defaultScrollPosition = useRef([0, 0]);

    let [isLoadingMirror, setIsLoadingMirror] = useState(false);
    let [mirrorLoadingError, setMirrorLoadingError] = useState(null);
    
    let [focused, setFocused] = useState(false);
    let [touched, setTouched] = useState(false);
    
    let [showsMask, setShowsMask] = useState(Mirror.current === null || defaultSelection === null);
    let [showsMirror, setShowsMirror] = useState(!showsMask);

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

    return (
        <div
            class={`CodeArea${focused ? ' focused' : ''}${touched ? ' touched' : ''}`}
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
                        onScroll={(event) => {
                            defaultScrollPosition.current = [
                                event.target.scrollLeft,
                                event.target.scrollTop,
                            ];
                        }}
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
                <InProgress />
            )}
        </div>
    );
};
