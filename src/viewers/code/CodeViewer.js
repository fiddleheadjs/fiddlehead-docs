import './CodeViewer.less';
import {useRef, useLayoutEffect} from 'fiddlehead';
import {highlightElement} from '../../utils/highlight';

export let CodeViewer = ({code, language, options = {}}) => {
    let codeElementRef = useRef(null);

    useLayoutEffect(() => {
        if (codeElementRef.current !== null) {
            highlightElement(codeElementRef.current);
        }
    }, []);

    return (
        <div class="CodeViewer">
            <pre {...options}>
                <code
                    ref={codeElementRef}
                    class={`language-${language}`} // keep the same format with Marked
                    innerHTML={code}
                />
            </pre>
        </div>
    );
};
