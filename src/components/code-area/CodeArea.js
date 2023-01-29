import './CodeArea.less';
import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';
import {border_radius, color} from '../../style/theme';

export let CodeArea = ({defaultValue, onChange, onLoadingStateChange, language}) => {    
    let Mirror = useRef(null);
    
    let [defaultSelection, setDefaultSelection] = useState(null);
    let [isLoadingMirror, setIsLoadingMirror] = useState(false);
    let [mirrorLoadingError, setMirrorLoadingError] = useState(null);

    let [focused, setFocused] = useState(false);
    let [touched, setTouched] = useState(false);

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
        }).catch((error) => {
            setMirrorLoadingError(error.message);
        }).finally(() => {
            setIsLoadingMirror(false);
        });
    }, [defaultSelection]);

    let showsMask = Mirror.current === null || defaultSelection === null;

    return (
        <div
            class={`CodeArea${focused ? ' focused' : ''}${touched ? ' touched' : ''}`}
            onTouchStart={() => setTouched(true)}
            onTouchEnd={() => setTouched(false)}
            onMouseEnter={() => setTouched(true)}
            onMouseLeave={() => setTouched(false)}
        >
            <div class="scrollable">
                {showsMask
                    ? <Mask
                        content={defaultValue}
                        onSelectionChange={setDefaultSelection}
                        onFocusChange={setFocused}
                        language={language}
                    />
                    : <Mirror.current
                        defaultValue={defaultValue}
                        defaultSelection={defaultSelection}
                        onChange={onChange}
                        onFocusChange={setFocused}
                        language={language}
                    />
                }
            </div>
            {showsMask && focused && (
                <div
                    style={{
                        pointerEvents: 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        borderRadius: `${border_radius.level_2}px`,
                        boxShadow: focused ? `inset 0 0 0 1px ${color.primary}` : null,
                    }}
                />
            )}
        </div>
    );
};
