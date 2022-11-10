import './CodeViewer.less';
import {useRef, useLayoutEffect, useCallback} from 'fiddlehead';
import {highlightElement} from '../../modules/highlight';

export let CodeViewer = ({code, language, options = {}}) => {
    let codeElementRef = useRef(null);

    let highlight = useCallback(() => {
        if (codeElementRef.current !== null) {
            highlightElement(codeElementRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        highlight();
        window.addEventListener('resize', highlight);
        return () => {
            window.removeEventListener('resize', highlight);
        };
    }, [highlight]);

    return (
        <div class="CodeViewer">
            <pre {...options}>
                <code
                    ref={codeElementRef}
                    class={`language-${language}`} // keep the same format with Marked
                >
                    {code}
                </code>
            </pre>
        </div>
    );
};
