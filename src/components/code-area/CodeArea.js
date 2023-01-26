import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';

let Mirror = null;

export let CodeArea = ({defaultValue, onChange, onLoadingStateChange, language}) => {
    let [loadsMirror, setLoadsMirror] = useState(false);
    let defaultSelection = useRef(null);

    useEffect(() => {
        if (!(loadsMirror && Mirror === null)) {
            return;
        }

        onLoadingStateChange({
            inProgress: true,
            error: null
        });

        import('./Mirror').then((exports) => {
            Mirror = exports.Mirror;

            setLoadsMirror(false);
            onLoadingStateChange({
                inProgress: false,
                error: null
            });
        }).catch((error) => {
            setLoadsMirror(false);
            onLoadingStateChange({
                inProgress: false,
                error: error.message
            });
        });
    }, [loadsMirror]);

    return (
        <div class="CodeArea">
            {Mirror === null
                ? <Mask
                    content={defaultValue}
                    onSelectionChange={(selection) => {
                        defaultSelection.current = selection;
                        setLoadsMirror(true);
                    }}
                    language={language}
                />
                : <Mirror
                    defaultValue={defaultValue}
                    defaultSelection={defaultSelection.current}
                    onChange={onChange}
                    language={language}
                />
            }
        </div>
    );
};
