import {useRef, useEffect} from 'fiddlehead';
import {gray} from '../../style/theme';
import {getCaretPosition} from '../../utils/getCaretPosition';
import {TAB_SIZE} from './tabSize';

export let Mask = ({content, onSelectionChange, onFocusChange, onScroll, language}) => {
    let preRef = useRef(null);
    let codeRef = useRef(null);

    useEffect(() => {
        let scroller = preRef.current;
        let listenOptions = {passive: true};
        
        scroller.addEventListener('scroll', onScroll, listenOptions);

        return () => {
            // Matching event listeners for removal
            // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#matching_event_listeners_for_removal
            scroller.removeEventListener('scroll', onScroll, listenOptions);
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
                innerHTML={content}
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
            />
        </pre>
    );
};
