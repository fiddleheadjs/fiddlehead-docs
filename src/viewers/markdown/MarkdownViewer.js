import './MarkdownViewer.less';
import {useEffect, useLayoutEffect, useRef} from 'fiddlehead';
import * as marked from 'marked';
import {highlightAllUnder} from '../../modules/highlight';
import {navigate} from '../../modules/router';

const linkSvg = (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1em" fill="currentColor">`
    + `<path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"/>`
    + `</svg>`
);

export let MarkdownViewer = ({content, headings, headingPosRef}) => {
    let elementRef = useRef(null);

    useLayoutEffect(() => {
        let highlight = () => {
            if (elementRef.current !== null) {
                highlightAllUnder(elementRef.current);
            }
        };
        highlight();
        window.addEventListener('resize', highlight);
        return () => {
            window.removeEventListener('resize', highlight);
        };
    }, []);

    useEffect(() => {
        if (elementRef.current === null) {
            return;
        }
        let links = elementRef.current.querySelectorAll('a[href^="/"]');
        [].forEach.call(links, (link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                navigate(link.href);
            });
        });
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
        let options = '';
        
        // Pattern: /** options go here */
        let match = code.match(/^\s*\/\*\*\s*(.*?)\s*\*\/\s*\r?\n/m);
        if (match !== null) {
            options = match[1];
            code = code.substring(match[0].length);
        }

        code = code.trimEnd()
            .replace(/&/, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        return (
            `<pre${options && ' ' + options}><code class="language-${language}">${code}</code></pre>`
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
