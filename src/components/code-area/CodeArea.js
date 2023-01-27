import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';

export let CodeArea = ({defaultValue, onChange, onLoadingStateChange, language}) => {    
    let Mirror = useRef(null);
    let [isLoadingMirror, setIsLoadingSandbox] = useState(false);
    let [mirrorLoadingError, setLoadingError] = useState(null);
    let [defaultSelection, setDefaultSelection] = useState(null);

    useEffect(() => {
        onLoadingStateChange({
            inProgress: isLoadingMirror,
            error: mirrorLoadingError
        });
    }, [isLoadingMirror, mirrorLoadingError]);

    useEffect(() => {
        if (defaultSelection === null || isLoadingMirror || Mirror.current !== null) {
            return;
        }

        setLoadingError(null);
        setIsLoadingSandbox(true);

        import('./Mirror').then((exports) => {
            Mirror.current = exports.Mirror;
        }).catch((error) => {
            setLoadingError(error.message);
        }).finally(() => {
            setIsLoadingSandbox(false);
        });
    }, [defaultSelection]);

    return (
        <div class="CodeArea">
            {Mirror.current !== null && defaultSelection !== null
                ? <Mirror.current
                    defaultValue={defaultValue}
                    defaultSelection={defaultSelection}
                    onChange={onChange}
                    language={language}
                />
                : <Mask
                    content={defaultValue}
                    onSelectionChange={(selection) => {
                        setDefaultSelection(selection);
                    }}
                    language={language}
                />
            }
        </div>
    );
};
