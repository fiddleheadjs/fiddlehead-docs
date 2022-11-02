import './CodeViewer.less';
import {highlight} from '../../utils/highlight';

export let CodeViewer = ({code, language}) => {
    const highlightedCode = highlight(code, language);

    return (
        <div className="CodeViewer">
            <pre>
                <code
                    className={`language-${language}`} // keep the same format with Marked
                    dangerouslySetInnerHTML={{__html: highlightedCode}}
                />
            </pre>
        </div>
    );
};
