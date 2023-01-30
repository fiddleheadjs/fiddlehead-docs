import {useRef, useEffect} from 'fiddlehead';
import {highlightElement} from '../../modules/highlight';
import {gray} from '../../style/theme';
import {getCaretPosition} from '../../utils/getCaretPosition';
import {TAB_SIZE} from './tabSize';

export let Mask = ({content, onSelectionChange, onFocusChange, onScroll, language}) => {
    let preRef = useRef(null);
    let codeRef = useRef(null);

    useEffect(() => {
        if (codeRef.current !== null) {
            highlightElement(codeRef.current);
        }
    }, []);

    useEffect(() => {
        let scroller = preRef.current;
        let options = {passive: true};
        
        scroller.addEventListener('scroll', onScroll, options);

        return () => {
            // Matching event listeners for removal
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#matching_event_listeners_for_removal
            scroller.removeEventListener('scroll', onScroll, options);
        };
    }, [onScroll]);

    let handleSelectionChange = () => {
        requestAnimationFrame(() => {
            // Call the callback in the next animation frame, because
            // we need to wait for the window to recognize the selection
            onSelectionChange(getCaretPosition(codeRef.current));
        });
    };

    return (
        <pre
            class={`language-${language}`}
            style={{overflowX: 'auto'}}
            ref={preRef}
        >
            <code
                class={`language-${language}`}
                onSelectStart={() => {
                    // This event will not fire when a range is selected,
                    // it only fires when the user start selecting.
                    handleSelectionChange();
                }}
                onKeyDown={() => {
                    // In case of error, when the user is typing
                    // we will try to load the Mirror again
                    handleSelectionChange();
                }}
                onFocus={() => onFocusChange(true)}
                onBlur={() => onFocusChange(false)}
                contenteditable
                spellcheck="false"
                autocorrect="off"
                autocapitalize="off"
                translate="no"
                data-gramm="false" // disable Grammarly
                style={{
                    tabSize: TAB_SIZE,
                    caretColor: gray.black,
                    outline: 'none',
                }}
                ref={codeRef}
            >
                {content}
            </code>
        </pre>
    );
};
