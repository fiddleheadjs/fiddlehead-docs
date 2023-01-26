import {useRef, useEffect} from 'fiddlehead';
import {highlightElement} from '../../modules/highlight';
import {getCaretPosition} from '../../utils/getCaretPosition';

export let Mask = ({content, onSelectionChange, language}) => {
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
                    // This event will not fire when a range is selected,
                    // it only fires when the user start selecting.
                    // TODO: Update selection when a range is selected

                    requestAnimationFrame(() => {
                        // Call the callback in the next animation frame, because
                        // we need to wait for the window to recognize the selection
                        onSelectionChange(getCaretPosition(codeElementRef.current));
                    });
                }}
                contenteditable
                spellcheck="false"
                autocorrect="off"
                autocapitalize="off"
                translate="no"
                data-gramm="false" // disable Grammarly
                style={{tabSize: 4}}
                ref={codeElementRef}
            >
                {content}
            </code>
        </pre>
    );
};
