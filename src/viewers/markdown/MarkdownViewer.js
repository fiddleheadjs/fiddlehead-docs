import './MarkdownViewer.less';
import {useLayoutEffect, useRef} from 'fiddlehead';
import * as marked from 'marked';
import {highlightAllUnder, parseLanguageNotation} from '../../utils/highlight';

export let MarkdownViewer = ({content, headings, headingPosRef}) => {
    let elementRef = useRef(null);

    useLayoutEffect(() => {
        if (elementRef.current !== null) {
            highlightAllUnder(elementRef.current);
        }
    }, []);

    const renderer = new marked.Renderer();

    renderer.heading = (text, level) => {
        if (level === 1) {
            return `<h${level}>${text}</h${level}>`;
        }

        headingPosRef.current++;
        const {id} = headings[headingPosRef.current];

        return `<h${level} id="${id}"><a href="#${id}">&para;</a>${text}</h${level}>`;
    };

    renderer.code = (code, languageNotation) => {
        let [language, options] = parseLanguageNotation(languageNotation);
        
        let preAttrs = '';
        if (options !== null) {
            preAttrs = ' ' + Object.keys(options).map(
                key => `${key}="${options[key]}"`
            ).join(' ');
        }

        return (
            `<pre${preAttrs}><code class="language-${language}">${code}</code></pre>`
        );
    };

    const markedOptions = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        renderer: renderer,
    };

    return (
        <div
            class="MarkdownViewer"
            innerHTML={marked.marked(content, markedOptions)}
            ref={elementRef}
        />
    );
};
