import {useState} from 'fiddlehead';
import {Touchable} from './Touchable';

let Mirror = null;

export let CodeArea = ({defaultValue, onChange, language}) => {
    let [defaultSelectionAnchor, setDefaultSelectionAnchor] = useState(null);

    return (
        <div class="CodeArea">
            {Mirror === null
                ? <Touchable
                    content={defaultValue}
                    onSelect={([start, end]) => {
                        import('./Mirror').then((exports) => {
                            Mirror = exports.Mirror;
                            setDefaultSelectionAnchor(end);
                        });
                    }}
                    language={language}
                />
                : <Mirror
                    defaultValue={defaultValue}
                    defaultSelectionAnchor={defaultSelectionAnchor}
                    onChange={onChange}
                    language={language}
                />
            }
        </div>
    );
}
