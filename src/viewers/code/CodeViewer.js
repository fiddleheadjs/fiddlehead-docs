import './CodeViewer.less';
import {useRef, useLayoutEffect} from 'fiddlehead';
import {highlightElement} from '../../modules/highlight';

export let CodeViewer = ({code, language, options = {}}) => {
    let codeElementRef = useRef(null);

    useLayoutEffect(() => {
        let highlight = () => {
            if (codeElementRef.current !== null) {
                highlightElement(codeElementRef.current);
            }
        };
        highlight();
        window.addEventListener('resize', highlight);
        return () => {
            window.removeEventListener('resize', highlight);
        };
    }, []);

    return (
        <div class="CodeViewer">
            <pre class={`language-${language}`} {...options}>
                <code
                    ref={codeElementRef}
                    class={`language-${language}`}
                >
                    {code}
                </code>
            </pre>
        </div>
    );
};
