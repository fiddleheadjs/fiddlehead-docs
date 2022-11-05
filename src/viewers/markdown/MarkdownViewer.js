import './MarkdownViewer.less';
import {useLayoutEffect, useRef} from 'fiddlehead';
import * as marked from 'marked';
import {highlightAllUnder} from '../../utils/highlight';

const linkSvg = `<svg width="1em" height="1em" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9C1.89543 9 1 8.10457 1 7V5C1 3.89543 1.89543 3 3 3H7.66667C8.77124 3 9.66667 3.89543 9.66667 5V7C9.66667 8.10457 8.77124 9 7.66667 9H7C6.63182 9 6.33333 8.7015 6.33333 8.33333C6.33333 7.96517 6.63182 7.66667 7 7.66667H7.66667C8.03485 7.66667 8.33333 7.36816 8.33333 7V5C8.33333 4.63184 8.03485 4.33333 7.66667 4.33333H3C2.63182 4.33333 2.33333 4.63184 2.33333 5V7C2.33333 7.36816 2.63182 7.66667 3 7.66667C3.36818 7.66667 3.66667 7.96517 3.66667 8.33333C3.66667 8.7015 3.36818 9 3 9Z"/>
<path d="M11 5C12.1046 5 13 5.89543 13 7V9C13 10.1046 12.1046 11 11 11H6.33333C5.22876 11 4.33333 10.1046 4.33333 9V7C4.33333 5.89543 5.22876 5 6.33333 5H7C7.36818 5 7.66667 5.2985 7.66667 5.66667C7.66667 6.03483 7.36818 6.33333 7 6.33333H6.33333C5.96515 6.33333 5.66667 6.63184 5.66667 7V9C5.66667 9.36816 5.96515 9.66667 6.33333 9.66667H11C11.3682 9.66667 11.6667 9.36816 11.6667 9V7C11.6667 6.63184 11.3682 6.33333 11 6.33333C10.6318 6.33333 10.3333 6.03483 10.3333 5.66667C10.3333 5.2985 10.6318 5 11 5Z"/>
</svg>`;

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
        let {id} = headings[headingPosRef.current];

        // Relate to passing the top bar when scroll-into-view.
        // Headings have their z-index attributes in descending order,
        // to avoid overlap ones above due to their padding-top.
        let zIndex = 2 + headings.length - headingPosRef.current;

        return `<h${level} id="${id}" style="z-index:${zIndex}">`
            + `${text}<a href="#${id}">${linkSvg}</a></h${level}>`;
    };

    renderer.code = (code, language) => {
        let options = null;

        let firstLine = code.split('\n', 1)[0].trim();
        if (firstLine.startsWith('//')) {
            try {
                options = JSON.parse(firstLine.substring(2));
                code = code.substring(firstLine.length);
            } catch (error) {}
        }

        code = code.trim();
        
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
