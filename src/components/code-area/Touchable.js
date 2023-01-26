import {useRef, useEffect} from 'fiddlehead';
import {highlightElement} from '../../modules/highlight';
import {getCaretPosition} from '../../utils/getCaretPosition';

export let Touchable = ({content, onSelect, language}) => {
    let codeElementRef = useRef(null);

    useEffect(() => {
        if (codeElementRef.current !== null) {
            highlightElement(codeElementRef.current);
        }
    }, []);

    return (
        <pre class={`language-${language}`}>
            <code
                class={`language-${language}`}
                onSelectStart={() => {
                    // Need to wait for the window to recognize the selection
                    requestAnimationFrame(() => {
                        onSelect(getCaretPosition(codeElementRef.current));
                    });
                }}
                contenteditable
                ref={codeElementRef}
            >
                {content}
            </code>
        </pre>
    );
}
