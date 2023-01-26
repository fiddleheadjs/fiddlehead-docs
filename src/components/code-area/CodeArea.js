import {useState, useEffect, useRef} from 'fiddlehead';
import {Mask} from './Mask';

let Mirror = null;

export let CodeArea = ({defaultValue, onChange, language}) => {
    let [loadsMirror, setLoadsMirror] = useState(false);
    let defaultSelection = useRef(null);

    useEffect(() => {
        if (!(loadsMirror && Mirror === null)) {
            return;
        }
        import('./Mirror').then((exports) => {
            Mirror = exports.Mirror;
            setLoadsMirror(false);
        });
    }, [loadsMirror]);

    return (
        <div class="CodeArea">
            {Mirror === null
                ? <Mask
                    content={defaultValue}
                    onSelect={(selection) => {
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
