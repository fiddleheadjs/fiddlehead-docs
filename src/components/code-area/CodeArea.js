import './CodeArea.less';
import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';

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

    return (
        <div
            class={`CodeArea${focused ? ' focused' : ''}${touched ? ' touched' : ''}`}
            onTouchStart={() => setTouched(true)}
            onTouchEnd={() => setTouched(false)}
            onMouseEnter={() => setTouched(true)}
            onMouseLeave={() => setTouched(false)}
        >
            {Mirror.current !== null && defaultSelection !== null
                ? <Mirror.current
                    defaultValue={defaultValue}
                    defaultSelection={defaultSelection}
                    onChange={onChange}
                    onFocusChange={setFocused}
                    language={language}
                />
                : <Mask
                    content={defaultValue}
                    focused={focused}
                    onSelectionChange={setDefaultSelection}
                    onFocusChange={setFocused}
                    language={language}
                />
            }
        </div>
    );
};
